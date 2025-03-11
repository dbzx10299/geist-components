import type { ResponsiveProp, StrictResponsiveProp } from './types'

export function rem(pixels: number, baseFontSize = 16): string {
  const rems = pixels / baseFontSize
  return `${rems}rem`
}

const breakpoints = ['sm', 'md', 'lg'] as const

export function mapResponsiveProp<Value>(prop: string, value: Value): Record<string, Value> {
  const mappedStyles: Record<string, Value> = {}

  if (typeof value !== 'object') {
    if (value !== null) {
      mappedStyles[`--${prop}`] = value
    }
  } else {
    let previousBreakpointValue: Value | undefined;

    breakpoints.forEach(breakpoint => {
      const breakpointValue = (value as unknown as Record<(typeof breakpoint)[number], Value>)[breakpoint]
      if (
        breakpointValue !== null && 
        breakpointValue !== undefined &&
        breakpointValue !== previousBreakpointValue
      ) {
        mappedStyles[`--${breakpoint}-${prop}`] = breakpointValue
        previousBreakpointValue = breakpointValue
      }
    })
  }

  console.log('mapped: ', mappedStyles)
  return mappedStyles
}



export function restrictResponsiveProp<T>(
  prop: ResponsiveProp<T>
): StrictResponsiveProp<T> {
  if (typeof prop === 'object' && prop !== null) {
    if (!('sm' in prop)) {
      throw new Error('Failed to restrict responsive prop, an object was passed without an sm key')
    }

    const strict = {
      sm: (prop.sm || null) as T,
      md: (prop.md || prop.sm || null) as T,
      lg: (prop.lg || prop.md || prop.sm || null) as T
    }
    
    if (Object.values(strict).some(v => v === undefined || v === null)) {
      throw new Error('Failed to restrict responsive prop, an invalid value was passed to sm, md or lg')
    }

    return strict
  }

  return {
    sm: prop,
    md: prop,
    lg: prop,
  }
}