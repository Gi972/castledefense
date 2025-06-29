// ResponsiveObject.tsx
import React from 'react'
import { ThreeElements } from '@react-three/fiber'
import { useResponsiveProps } from './useResponsiveProps'

type ResponsiveConfig = {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  visible?: boolean
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BreakpointConfig = Partial<Record<Breakpoint, ResponsiveConfig>>

type ElementType = keyof ThreeElements

type ResponsiveObjectProps<T extends ElementType> = {
  as?: T
  config: BreakpointConfig
  children?: React.ReactNode
} & ThreeElements[T]

export function ResponsiveObject<T extends ElementType = 'group'>({
  as,
  config,
  children,
  ...rest
}: ResponsiveObjectProps<T>) {
  const Tag = (as || 'group') as unknown as React.ComponentType<any>
  const responsiveProps = useResponsiveProps<ResponsiveConfig>(config)

  return (
    <Tag {...responsiveProps} {...(rest as object)}>
      {children}
    </Tag>
  )
}
