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
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  fetchUser: async () => {},
  refreshUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (user) return;
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const userId = userData.user.id;
    const email = userData.user.email ?? '';

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      setUser(null);
    } else {
      let avatarUrl = profile.avatar_url;
      const storageBaseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/`;

      // avatars/ が二重になっていないか確認して修正
      if (avatarUrl) {
        avatarUrl = avatarUrl.replace('avatars/', '');
        console.log(avatarUrl);
        if (!avatarUrl.startsWith('http')) {
          avatarUrl = `${storageBaseUrl}${avatarUrl}`;
        }
      }

      console.log(`修正後のアバターURL: ${avatarUrl}`);
      setUser({ ...profile, email, avatar_url: avatarUrl });
    }

    setLoading(false);
  }, [supabase, user]);

  const refreshUser = async () => {
    setUser(null);
    await fetchUser();
  };

  useEffect(() => {
    if (!user) fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchUser, supabase.auth, user]);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
