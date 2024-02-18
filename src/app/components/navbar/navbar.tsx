'use client';

import Button from '@/components/base/button';
import { HOME_PAGE, LOGIN_PAGE, SIGNUP_PAGE } from '@/constants/navbar';
import { AUTHENTICATED, LOADING, UNAUTHENTICATED } from '@/constants/session';
import cn from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';
import './navbar.scss';

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [authPage, setAuthPage] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();

  if (session && status) {
    console.log(session.user, status); // eslint-disable-line no-console
  }

  const handleSignOut = (): void => {
    void (async () => {
      try {
        await signOut({ callbackUrl: '/login' });
      } catch (error) {
        console.error(`Error signing out: ${error}`);
      }
    })();
  };

  useEffect((): void => {
    setAuthPage(pathname);

    if (status === AUTHENTICATED) {
      setIsAuthenticated(true);
    } else if (status === UNAUTHENTICATED) {
      setIsAuthenticated(false);
    } else if (status === LOADING) {
      setIsAuthenticated(false);
    }
  }, [pathname, status]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
        </Link>
      </div>
      {isAuthenticated ? (
        <ul className="nav_items">
          <li className="nav_item">
            <p className="nav_item username">{session?.user?.name}</p>
          </li>
          <li className="nav_item">
            <Button className="nav_button create" onClick={handleSignOut}>
              Sign out
            </Button>
          </li>
        </ul>
      ) : (
        <ul
          className={cn('nav_items', {
            buttonGap: authPage === HOME_PAGE
          })}
        >
          <li className="nav_item">
            {authPage !== LOGIN_PAGE && (
              <Button className="nav_button">
                <Link href={LOGIN_PAGE}>Login</Link>
              </Button>
            )}
          </li>
          <li className="nav_item">
            {authPage !== SIGNUP_PAGE && (
              <Button className="nav_button create">
                <Link href={SIGNUP_PAGE}>Sign up</Link>
              </Button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
