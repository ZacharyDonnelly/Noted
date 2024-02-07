import cn from 'classnames';
import { ReactNode } from 'react';
import './button.scss';

interface ButtonProps {
  submit?: boolean;
  btnText?: string;
  className?: string;
  children?: ReactNode;
  mask?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, btnText = '', submit = false, className = '', mask = false }) => (
  <button
    type={submit ? 'submit' : 'button'}
    className={cn('noted_button', {
      [className]: className,
      imageMask: mask
    })}
  >
    {children}
    {btnText}
  </button>
);

export default Button;
