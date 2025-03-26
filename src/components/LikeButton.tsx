'use client';

import { useState, useEffect } from 'react';
import { toggleLike, checkUserLike } from '@/lib/supabase/actions';
import { useUser } from '@/lib/userContext';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface LikeButtonProps {
  productId: string;
  initialLikesCount: number;
}

export default function LikeButton({
  productId,
  initialLikesCount,
}: LikeButtonProps) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      checkUserLike(productId, user.id).then(setLiked);
    }
  }, [user, productId]);

  const handleLike = async () => {
    if (!user) {
      setModalOpen(true);
      return;
    }

    const result = await toggleLike(productId, user.id);
    if (!result.error) {
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    }
  };

  return (
    <>
      <button
        className={`flex items-center cursor-pointer text-sm lg:text-2xl ${
          liked ? 'original-yellow' : ''
        }`}
        onClick={handleLike}
      >
        <Heart />
        <span className='pl-2'>{likesCount}</span>
      </button>

      {/* ログインを促すモーダル */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className='max-w-md p-6 bg-white'
          aria-describedby='need-login-modal'
        >
          <DialogTitle className='text-lg font-bold'>
            ログインが必要です
          </DialogTitle>
          <p className='mt-2'>いいねをするにはログインしてください。</p>
          <div className='mt-4'>
            <Link href='/login' className='text-blue-500 hover:underline'>
              ログインページへ
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
