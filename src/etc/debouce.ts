import { useState } from "react";

export type DebouncedFunction = (...args: any[]) => void;

function debounce<T extends Function>(
  func: T,
  timeout: number,
  setTimer: (timer: number | undefined) => void,
  timer?: number
): DebouncedFunction {
  return (...args: any[]) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        func(...args);
      }, timeout)
    );
  };
}

export function useDebounce<T extends Function>(func: T, timeout: number) {
  const [timer, setTimer] = useState<number | undefined>();

  return debounce(func, timeout, setTimer, timer);
}
