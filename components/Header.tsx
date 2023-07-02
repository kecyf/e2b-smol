import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header className="flex justify-between p-5 bg-blue-500">
      <Link href="/">
        <a className="text-white text-lg">T3 App</a>
      </Link>
      <nav>
        {!session && !loading && (
          <Link href="/api/auth/signin">
            <a className="text-white text-lg">Sign In</a>
          </Link>
        )}
        {session && (
          <>
            <span className="text-white text-lg">{session.user?.email}</span>
            <Link href="/api/auth/signout">
              <a className="ml-4 text-white text-lg">Sign Out</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;