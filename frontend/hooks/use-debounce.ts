import { useEffect, useRef } from 'react'

export function useDebounce(callback: () => void, delay: number, deps: unknown[]) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(callback, delay)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
