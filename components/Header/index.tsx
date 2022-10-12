import React from 'react';
import Link from 'next/link';

function Header(props: any) {
  return (
    <div className="flex justify-between w-full p-6">
      <div className="flex items-center">
        <Link href={'/'}>
          <div className="text-2xl font-bold">Amruth&apos;s Blogs</div>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <Link href={'/create'}>
          <div className="text-xl font-bold cursor-pointer">Create a post</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
