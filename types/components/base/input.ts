import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  label_text: string;
  className?: string;
  validationSchema?: Record<string, unknown>;
}
