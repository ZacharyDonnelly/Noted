import './card.scss';

interface CardProps {
  header: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ header, content }) => (
  <div className="card">
    <div className="card_wrapper">
      <h4>{header}</h4>
      <p className="content">{content}</p>
    </div>
  </div>
);

export default Card;
