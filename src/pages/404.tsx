import type { NextPage } from 'next';
import React from 'react';
import { GrDropbox } from 'react-icons/gr';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className="min-h-screen flex justify-center align-middle m-auto">
      <div className="m-auto text-center">
        <GrDropbox className="text-7xl mx-auto text-yellow-500" />
        <div className="text-2xl font-bold my-4"> Not Found</div>
        <div className="text-base my-4">
          Please visit the homepage to explore more
        </div>
        <Link href="/">
          <a className="p-2 px-4 py-3 mt-5 bg-blue-600 hover:bg-blue-700 duration-150 cursor-pointer text-white my-3">
            Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
