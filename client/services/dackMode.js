// useDarkModeToggle.js
import { useEffect } from 'react';
import { setLocalStorageItems } from "@/utils/helpers";

const useDarkModeToggle = (theme, setTheme) => {
 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelector("html").classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalStorageItems("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return toggleTheme;
};

export default useDarkModeToggle;
