import cn from 'classnames';
import Label from '../label/label';
import './input.scss';

interface InputProps {
  id: string;
  label_text: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, label_text, className = '' }) => (
  <div className="form_input">
    <div className="input_wrapper">
      <Label id={id} text={label_text} />
      <div>
        <input
          className={cn('form_input', {
            [className]: className
          })}
        />
      </div>
    </div>
  </div>
);

export default Input;
