import Card from '@/components/cta/card/card';
import Featured from '@/components/cta/featured/featured';
import Hero from '@/components/hero/hero';
import './homepage.scss';

const Homepage: React.FC = () => (
  <div className="homepage">
    <Hero />
    <section className="homepage_cta">
      <header className="homepage_header">
        <h3>Why Notebook?</h3>
        <p>
          Notebook is a personal note taking app and blog, all in one It&apos;s the perfect tool for creators, writers,
          developers, and anyone who wants to share their ideas with the world.
        </p>
      </header>
      <div className="card_row">
        <Card
          header="All the features you need"
          content="Use Notebook's rich text editor, translation and text to voice"
        />
        <Card
          header="Instant translations"
          content="Watch your typed text become instantly translated into your desired language"
        />
        <Card
          header="Text to voice translations"
          content="Aside from our text translation functionality. Listen to your highlighted text in your desired language"
        />
      </div>
    </section>
    <section className="featured">
      <header className="featured_header">
        <h4>Featured blog posts</h4>
        <p>Most recent blog posts that you may find interesting</p>
      </header>
      <div className="featured_row">
        <Featured content="Building a more inclusive design community" />
        <Featured content="Building a more inclusive design community" />
        <Featured content="Building a more inclusive design community" />
      </div>
    </section>
  </div>
);

export default Homepage;
