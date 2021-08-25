import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useLocalStorage = <T extends unknown>(
  key: string,
  init: T
): [T, SetValue<T>] => {
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : init;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return init;
    }
  };

  const [currentValue, setCurrentValue] = useState<T>(readValue);
  const setValue: SetValue<T> = (value) => {
    try {
      const nextValue = value instanceof Function ? value(currentValue) : value;
      window.localStorage.setItem(key, JSON.stringify(nextValue));
      setCurrentValue(nextValue);
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setCurrentValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("local-storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [currentValue, setValue];
};

export const useLocalStorageValue = <T extends unknown>(
  key: string,
  init: T
) => {
  const [value] = useLocalStorage(key, init);
  return value;
};
