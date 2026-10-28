import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={handleToggle}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

export default ThemeToggle;