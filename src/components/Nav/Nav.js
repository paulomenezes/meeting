import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-orange-400 p-6 mb-4 shadow'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link to='/'>
          <svg className='fill-current h-8 w-8 mr-2' viewBox='0 0 54 54'>
            <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
          </svg>
        </Link>
        <Link to='/'>
          <span className='font-semibold text-xl tracking-tight'>Meeting</span>
        </Link>
      </div>
    </nav>
  );
}
