import Link from 'next/link';
import './navbar.scss';

const Navbar: React.FC = () => (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Sign up</Link>
        </li>
      </ul>
    </nav>
);

export default Navbar;
