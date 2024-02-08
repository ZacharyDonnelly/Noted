'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaRegister } from '../zod/schemas';

export type FormTypeRegister = z.infer<typeof formSchemaRegister>;

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister)
  });
