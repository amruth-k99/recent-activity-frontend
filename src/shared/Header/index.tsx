import React from 'react';
import Link from 'next/link';
import { TiPencil } from 'react-icons/ti';

function Header(props: any) {
  return (
    <div className="flex justify-between w-full p-6">
      <div className="flex items-center">
        <Link href={'/'}>
          <div className="text-4xl font-bold">Amruth&apos;s Blogs</div>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <Link href={'/post/create'}>
          <div className="text-md flex gap-2 text-white rounded-3xl bg-blue-600 px-5 py-2 cursor-pointer">
            <TiPencil className="my-auto text-md" /> Create new post
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
