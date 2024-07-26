import { useEffect, useState } from "react";

export default function useDebounce(value = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);
  return debounceValue;
}
