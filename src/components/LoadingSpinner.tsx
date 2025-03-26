'use client';

export default function LoadingSpinner() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50'>
      <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
}
