import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue !== null
      ? JSON.parse(savedValue)
      : initialValue;
  });

  const updateValue = (newValue) => {
    setValue((currentValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? newValue(currentValue)
          : newValue;

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  };

  return [value, updateValue];
}

export default useLocalStorage;