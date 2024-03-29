import { LabelProps } from '@/types/components/base/label';
import cn from 'classnames';
import './label.scss';

const Label: React.FC<LabelProps> = ({ id, text, className = '' }) => (
  <label
    className={cn('form_label', {
      [className]: className
    })}
    htmlFor={id}
  >
    {text}
  </label>
);

export default Label;
