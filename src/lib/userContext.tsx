'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

type UserProfile = Database['public']['Tables']['profiles']['Row'] & {
  email: string;
};

type UserContextType = {
  session: Session | null;
  user: UserProfile | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setLoading(false);
        return;
      }

      setSession(data.session);

      if (data.session?.user) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, created_at') // email を除外
          .eq('id', data.session.user.id)
          .single();

        setUser({
          ...userData,
          email: data.session.user.email, // session から email を追加
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        if (!session) setUser(null);
        else fetchUser();
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ session, user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
