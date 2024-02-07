import cn from 'classnames';
import Label from '../label/label';
import './input.scss';

interface InputProps {
  id: string;
  label_text: string;
  className?: string;
  noSpacing?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label_text, className = '', noSpacing = false }) => (
  <div
    className={cn('form_input_wrapper', {
      [className]: className
    })}
  >
    <Label id={id} text={label_text} noSpacing={noSpacing} />
    <input className="form_input" id={id} name={id} type="text" />
  </div>
);

export default Input;
