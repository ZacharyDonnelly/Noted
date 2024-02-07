import Button from '@/components/base/button';
import Link from 'next/link';
import './hero.scss';

const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero_wrapper">
      <div className="hero_img" />
      <header className="hero_header">
        <h1>
          Take notes,
          <span>in any language!</span>
        </h1>
        <h2>
          Experience real time translation into your specified language as you type. Listen to highlighted sections
          spoken out loud in your desired language!
        </h2>
        <Button className="hero_button">
          <Link href="/signup">Get started now</Link>
        </Button>
      </header>
    </div>
  </section>
);

export default Hero;
