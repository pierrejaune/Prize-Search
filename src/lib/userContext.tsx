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
    if (user) return; // 🔹 既にデータがある場合はスキップ
    console.log('[fetchUser] Fetching user data...');
    setLoading(true);

    // 🔹 `getSession` は削除し、`getUser` のみ使用
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.log('[fetchUser] No active session found.');
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
      console.error('[fetchUser] Profile fetch error:', profileError?.message);
      setUser(null);
    } else {
      setUser({ ...profile, email });
      console.log('[fetchUser] Profile data:', profile);
    }

    setLoading(false);
  }, [supabase, user]); // 🔹 `user` を依存に追加し、不要なリクエストを抑制

  useEffect(() => {
    if (!user) fetchUser(); // 🔹 初回のみデータ取得

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      console.log('[onAuthStateChange] Event:', event);
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
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
