import './featured.scss';

interface FeaturedProps {
  content: string;
}

const Featured: React.FC<FeaturedProps> = ({ content }) => (
  <div className="featured_story">
    <div className="story_wrapper">
      <p className="content">{content}</p>
    </div>
  </div>
);

export default Featured;
