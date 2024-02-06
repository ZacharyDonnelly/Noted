import Label from '../label/label';
import './input.scss';

interface InputProps {
  id: string;
  label_text: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, label_text, className = '' }) => (
  <div className={`form_input_wrapper ${className}`}>
    <Label id={id} text={label_text} />
    <input className="form_input" type="text" />
  </div>
);

export default Input;
