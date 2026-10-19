import { useEffect, useState } from "react";

function useDebounce(value, ms) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, ms]);

  return debouncedValue;
}

export default useDebounce;
