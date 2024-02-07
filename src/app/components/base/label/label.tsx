import cn from 'classnames';
import './label.scss';

interface LabelProps {
  id: string;
  text: string;
  noSpacing: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ id, text, noSpacing, className = '' }) => (
  <label
    className={cn('form_label', {
      [className]: className,
      'noSpacing': noSpacing
    })}
    htmlFor={id}
  >
    {text}
  </label>
);

export default Label;
