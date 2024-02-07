import Button from '@/components/base/button';
import Image from 'next/image';
import Link from 'next/link';

import './navbar.scss';

const Navbar: React.FC = () => (
  <nav>
    <div className="logo">
      <Link href="/">
        <Image src="/logo.svg" width={100} height={85} alt="Notebook" />
      </Link>
    </div>
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
  </nav>
);

export default Navbar;
