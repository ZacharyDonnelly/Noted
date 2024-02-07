import { ReactNode } from 'react';

export interface ButtonProps {
  submit?: boolean;
  btnText?: string;
  className?: string;
  children?: ReactNode;
  mask?: boolean;
}
