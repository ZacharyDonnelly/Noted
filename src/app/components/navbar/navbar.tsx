'use client';

import Button from '@/components/base/button';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import './navbar.scss';

const Navbar: React.FC = () => {
  const [isHomepage, setIsHomepage] = useState<boolean>(true);
  const [authPage, setAuthPage] = useState<string>('');
  const [isPassedAuth, setIsPassedAuth] = useState<boolean>(false);
  const pathname = usePathname();

  // TODO: Refactor this because...well it's hideous
  const stateHandler = (page: string): void => {
    if (page === 'login') {
      setIsPassedAuth(false);
      setIsHomepage(false);
      setAuthPage('/login');
    } else if (page === 'sign up') {
      setIsPassedAuth(false);
      setIsHomepage(false);
      setAuthPage('/signup');
    } else if (page === 'dashboard') {
      setIsPassedAuth(true);
      setIsHomepage(false);
      setAuthPage('');
    } else {
      setIsPassedAuth(false);
      setIsHomepage(true);
    }
  };

  const urlHandler = (path: string): void => {
    if (path === '/') {
      stateHandler('home');
    } else if (path === '/login') {
      stateHandler('login');
    } else if (path === '/signup') {
      stateHandler('sign up');
    } else if (path === '/dashboard') {
      stateHandler('dashboard');
    }
  };

  useEffect((): void => {
    urlHandler(pathname.toLowerCase());
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
        </Link>
      </div>
      {isHomepage ? (
        <ul className="nav_items">
          <li className="nav_item">
            <Button className="nav_button">
              <Link href="/login">Login</Link>
            </Button>
          </li>
          <li className="nav_item">
            <Button className="nav_button create">
              <Link href="/signup">Sign up</Link>
            </Button>
          </li>
        </ul>
      ) : (
        <ul
          className={cn('nav_items', {
            singleBtn: !isHomepage
          })}
        >
          <li className="nav_item">
            {authPage !== '/login' && !isPassedAuth && (
              <Button className="nav_button">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </li>
          <li className="nav_item">
            {authPage !== '/signup' && !isPassedAuth && (
              <Button className="nav_button create">
                <Link href="/signup">Sign up</Link>
              </Button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
