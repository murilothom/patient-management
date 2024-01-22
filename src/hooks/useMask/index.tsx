import { useMemo } from 'react';
import { postalCode } from './postal-code';
import { cpf } from './cpf';

export interface Mask {
  apply(value: string | number): string;
  clean(value: string): string;
}

const handlers = {
  postalCode,
  cpf,
};
type Masks = keyof typeof handlers;

interface MaskReturn extends Mask {
  maskedValue: string;
  cleanedValue: string;
}

export const useMask = (mask: Masks, value: string): MaskReturn => {
  const { apply, clean } = useMemo(() => handlers[mask], [mask]);

  const maskedValue = useMemo(() => (apply ? apply(value) : value), [value, apply]);
  const cleanedValue = useMemo(() => (clean ? clean(value) : value), [value, clean]);

  return {
    apply, clean, maskedValue, cleanedValue,
  };
};
