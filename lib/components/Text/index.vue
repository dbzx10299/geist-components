<script setup lang="ts">
import styles from './text.module.css'
import { getTextVariables } from './utils'
import { mapResponsiveProp } from '../utils'
import type { ResponsiveProp } from '../types'
import type { Size, CoreTextVariant, Weight, LineHeight } from './types'

interface TextProps {
  as?: string;
  color?: string;
  size?: ResponsiveProp<Size>;
  variant?: ResponsiveProp<CoreTextVariant>;
  align?: ResponsiveProp<'left' | 'center' | 'right'>;
  transform?: 'none' | 'lowercase' | 'capitalize' | 'uppercase';
  lineHeight?: LineHeight;
  weight?: Weight;
  monospace?: boolean;
  wrap?: boolean;
  truncate?: boolean | number;
}

const {
  as = 'p',
  size = 14,
  lineHeight,
  weight,
  color = '#a1a1a1',
  transform,
  align,
  truncate,
  wrap = true,
  monospace = false,
  variant
} = defineProps<TextProps>()
</script>

<template>
  <component
    :is="as"
    :class="[
      styles.wrapper,
      {
        [styles.monospace]: monospace,
        [styles.nowrap]: !wrap,
        [styles.truncate]: truncate === true,
        [styles.clamp]: typeof truncate === 'number'
      }
    ]"
    :style="{
      '--text-color': color,
      ...getTextVariables({ size, lineHeight, weight, variant }),
      ...(mapResponsiveProp('text-align', align)),
      ...(typeof truncate === 'number' && { '--text-clamp': truncate }),
      ...(typeof transform === 'string' && { '--text-transform': transform })
    }"
  >
    <slot/>
  </component>
</template>