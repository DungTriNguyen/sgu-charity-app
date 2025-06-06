import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center text-center'>
      <div className='max-w-md w-full'>
        <img
          src='/404.webp'
          alt='404 not found'
          loading='lazy'
          className='w-full h-auto mb-6'
        />
        <h1 className='text-3xl font-bold mb-2'>Lỗi! Trang không tìm thấy</h1>
        <p className='text-gray-600 mb-6'>
          Trang mà bạn truy cập không tồn tại, bạn cần chuyển sang url khác để
          truy cập.
        </p>
        <Link
          href='/'
          className='inline-block px-6 py-2 border-2 rounded-md border-[#00a7ef] bg-white text-[#00a7ef] hover:text-[#00a7ef]/30 transition'
        >
          Quay về trang chủ
        </Link>
      </div>
    </main>
  );
}
