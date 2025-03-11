import type { ResponsiveProp } from '../types'
import type { CoreTextVariant, LineHeight, Size, Weight } from './types'
import { rem, restrictResponsiveProp } from '../utils'

import {
  sizeToFontWeight,
  sizeToLetterSpacing,
  sizeToLineHeight,
  variants,
} from './constants'

export function getTextVariables({
  size,
  variant,
  lineHeight,
  weight,
}: {
  size: ResponsiveProp<Size>;
  lineHeight?: LineHeight;
  weight?: Weight;
  variant?: ResponsiveProp<CoreTextVariant>;
}) {
  // Handle variants first
  if (variant) {
    // If the variant is a string, return static variables
    if (typeof variant === 'string') {
      const v = variants[variant]
      return {
        '--text-size': rem(v.size),
        '--text-line-height': rem(v.lineHeight),
        '--text-letter-spacing': `${v.letterSpacing || 0}px`,
        '--text-weight': weight ?? v.weight,
      }
    }

    // Otherwise return responsive variables
    const responsiveVariants = restrictResponsiveProp(variant)

    return Object.keys(responsiveVariants).reduce((combined, breakpoint) => {
      const breakpointVariant = responsiveVariants[breakpoint as keyof typeof responsiveVariants]

      const v = variants[breakpointVariant]

      return {
        ...combined,
        [`--${breakpoint}-text-size`]: rem(v.size),
        [`--${breakpoint}-text-line-height`]: rem(v.lineHeight),
        [`--${breakpoint}-text-weight`]: weight ?? v.weight,
        [`--${breakpoint}-text-letter-spacing`]: `${v.letterSpacing || 0}px`
      }
    }, {})

  }

  // If the size is a number, return static variables
  if (typeof size === 'number') {
    return {
      '--text-size': rem(size),
      '--text-line-height': lineHeight
        ? rem(lineHeight)
        : sizeToLineHeight[size],
      '--text-letter-spacing': sizeToLetterSpacing[size],
      '--text-weight': weight ? weight : sizeToFontWeight[size],
    }
  }

  // Otherwise return responsive variables
  const responsiveSizes = restrictResponsiveProp(size)

  return Object.keys(responsiveSizes).reduce((combined, breakpoint) => {
    const breakpointSize = responsiveSizes[breakpoint as keyof typeof responsiveSizes]

    return {
      ...combined,
      [`--${breakpoint}-text-size`]: rem(breakpointSize),
      [`--${breakpoint}-text-line-height`]: lineHeight
        ? rem(lineHeight)
        : sizeToLineHeight[breakpointSize],
      [`--${breakpoint}-text-weight`]: weight
        ? weight
        : sizeToFontWeight[breakpointSize],
      [`--${breakpoint}-text-letter-spacing`]:
        sizeToLetterSpacing[breakpointSize],
    };
  }, {})
}