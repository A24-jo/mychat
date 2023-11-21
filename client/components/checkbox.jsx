"use client"
import { useEffect, useState } from "react";

const ToggleCheckbox = () => {
  const [isChecked, setIsChecked] = useState( false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full appearance-none cursor-pointer"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      >
        <div
          className={`toggle-circle absolute h-6 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${
            isChecked ? "translate-x-10" : ""
          }`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleCheckbox;

