import Link from 'next/link';
import './hero.scss';

const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero_content">
      <header>
        <h1>
          Take notes,
          <span>in any language!</span>
        </h1>
        <h2>
          Experience real time translation into your specified language as you type. Listen to highlighted sections
          spoken out loud in your desired language!
        </h2>
      </header>
      <button type="button" className="hero_button">
        <Link href="/signup">Sign up now</Link>
      </button>
    </div>
  </section>
);

export default Hero;
