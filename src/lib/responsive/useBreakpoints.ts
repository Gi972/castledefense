import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export function useBreakpoints(): Breakpoint {
  const { size } = useThree()

  const breakpoint = useMemo<Breakpoint>(() => {
    const w = size.width
    if (w < 480) return 'xs'
    if (w < 768) return 'sm'
    if (w < 1024) return 'md'
    if (w < 1440) return 'lg'
    return 'xl'
  }, [size.width])

  return breakpoint
}
