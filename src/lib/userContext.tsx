'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { createClient } from '@/lib/supabase/client';

type UserType = {
  id: string;
  username: string;
  avatar_url: string | null;
  email: string;
} | null;

type UserContextType = {
  user: UserType;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  fetchUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    console.log('[fetchUser] Fetching user data...');
    setLoading(true);

    // 🔹 確実に最新のセッションを取得
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      console.error('[fetchUser] No active session found.');
      setUser(null);
      setLoading(false);
      return;
    }

    const userId = sessionData.session.user.id;
    const email = sessionData.session.user.email ?? '';

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('[fetchUser] Profile fetch error:', profileError?.message);
      setUser(null);
    } else {
      setUser({ ...profile, email });
      console.log('[fetchUser] Profile data:', profile);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchUser(); // 🔹 初回レンダリング時に確実に取得

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[onAuthStateChange] Event:', event);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          fetchUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchUser, supabase.auth]);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
