'use client';

import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/'; // ログアウト後にリダイレクト
  };

  return (
    <button
      onClick={handleLogout}
      className='px-4 py-2 bg-red-500 text-white rounded'
    >
      ログアウト
    </button>
  );
}
