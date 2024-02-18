import { CheckboxProps } from '@/types/components/base/checkbox';
import cn from 'classnames';
import Label from '../label';
import './checkbox.scss';

const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked, changeHandler, labelText, className = '' }) => (
  <div
    className={cn('checkbox', {
      [className]: className
    })}
  >
    <input type="checkbox" className="checkbox_input" id={id} name={name} checked={checked} onChange={changeHandler} />
    <Label className="checkbox_label" id={id} text={labelText} />
  </div>
);

export default Checkbox;
