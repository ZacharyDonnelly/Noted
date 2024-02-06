import './label.scss';

interface LabelProps {
  id: string;
  text: string;
}

const Label: React.FC<LabelProps> = ({ id, text }) => (
  <label className="form_label" htmlFor={id}>
    {text}
  </label>
);

export default Label;
