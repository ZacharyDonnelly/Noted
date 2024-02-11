import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  label_text: string;
  className?: string;
  validationSchema?: Record<string, unknown>;
}
