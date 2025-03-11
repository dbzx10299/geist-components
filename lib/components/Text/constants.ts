import type { CoreTextVariant } from './types'

export const sizeToLineHeight = {
  48: '3.5rem',
  40: '3.5rem',
  32: '2.5rem',
  24: '2rem',
  20: '1.5rem',
  18: '1.5rem',
  16: '1.5rem',
  14: '1.25rem',
  13: '1.125rem',
  12: '1rem',
  10: '0.75rem'
} as const;

export const sizeToLetterSpacing = {
  48: '-0.066875rem',
  40: '-0.058125rem',
  32: '-0.049375rem',
  24: '-0.029375rem',
  20: '-0.020625rem',
  18: 'initial',
  16: 'initial',
  14: 'initial',
  13: 'initial',
  12: 'initial',
  10: 'initial'
} as const;

export const sizeToFontWeight = {
  48: '700',
  40: '600',
  32: '600',
  24: '600',
  20: '600',
  16: '400',
  14: '400',
  13: '400',
  18: '400',
  12: '400',
  10: '400'
} as const;

export const variants: Record<
  CoreTextVariant,
  { size: number; weight: number; lineHeight: number; letterSpacing?: number }
> = {
  /**
   * Heading Variants
   */
  'heading-72': {
    size: 72,
    lineHeight: 72,
    weight: 600,
    letterSpacing: -4.32,
  },
  'heading-64': {
    size: 64,
    lineHeight: 64,
    weight: 600,
    letterSpacing: -3.84,
  },
  'heading-56': {
    size: 56,
    lineHeight: 56,
    weight: 600,
    letterSpacing: -3.36,
  },
  'heading-48': {
    size: 48,
    lineHeight: 56,
    weight: 600,
    letterSpacing: -2.88,
  },
  'heading-40': {
    size: 40,
    lineHeight: 48,
    weight: 600,
    letterSpacing: -2.4,
  },
  'heading-32': {
    size: 32,
    lineHeight: 40,
    weight: 600,
    letterSpacing: -1.28,
  },
  'heading-24': {
    size: 24,
    lineHeight: 32,
    weight: 600,
    letterSpacing: -0.96,
  },
  'heading-20': {
    size: 20,
    lineHeight: 26,
    weight: 600,
    letterSpacing: -0.4,
  },
  'heading-16': {
    size: 16,
    lineHeight: 24,
    weight: 600,
    letterSpacing: -0.32,
  },
  'heading-14': {
    size: 14,
    lineHeight: 20,
    weight: 600,
    letterSpacing: -0.28,
  },
  /**
   * Copy Variants
   */
  'copy-24': {
    size: 24,
    lineHeight: 36,
    weight: 400,
  },
  'copy-20': {
    size: 20,
    lineHeight: 36,
    weight: 400,
  },
  'copy-18': {
    size: 18,
    lineHeight: 28,
    weight: 400,
  },
  'copy-16': {
    size: 16,
    lineHeight: 24,
    weight: 400,
  },
  'copy-14': {
    size: 14,
    lineHeight: 20,
    weight: 400,
  },
  'copy-13': {
    size: 13,
    lineHeight: 18,
    weight: 400,
  }
}