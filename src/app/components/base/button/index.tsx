import { ButtonProps } from '@/types/components/base/button';
import cn from 'classnames';
import './button.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  btnText = '',
  submit = false,
  className = '',
  mask = false
}) => (
  <button
    type={submit ? 'submit' : 'button'}
    className={cn('noted_button', {
      [className]: className,
      imageMask: mask
    })}
    onClick={onClick}
  >
    {children}
    {btnText}
  </button>
);

export default Button;
