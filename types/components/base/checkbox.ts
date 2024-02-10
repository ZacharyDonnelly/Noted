import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  id: string;
  labelText: string;
  checked: boolean;
  name: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}
