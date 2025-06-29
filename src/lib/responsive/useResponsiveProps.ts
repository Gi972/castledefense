import { useBreakpoints, type Breakpoint } from "./useBreakpoints";

export function useResponsiveProps<T>(
  config: Partial<Record<Breakpoint, Partial<T>>>
): Partial<T> {
  const bp = useBreakpoints();

  const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
  const index = breakpoints.indexOf(bp);

  for (let i = index; i >= 0; i--) {
    const key = breakpoints[i];
    if (config[key]) return config[key]!;
  }

  return {};
}
