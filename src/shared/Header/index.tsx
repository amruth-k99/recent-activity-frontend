import React from 'react';
import Link from 'next/link';
import { TiPencil } from 'react-icons/ti';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full p-6">
      <div className="flex items-center">
        <Link href={'/'}>
          <div className="text-2xl md:text-4xl cursor-pointer font-bold">
            Amruth&apos;s Blogs
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        {router.pathname !== '/post/create' && (
          <Link href={'/post/create'}>
            <div className="text-lg flex gap-2 text-white rounded-3xl bg-blue-600 px-5 py-2 cursor-pointer">
              <TiPencil className="my-auto text-md mx-auto" /> Create
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
