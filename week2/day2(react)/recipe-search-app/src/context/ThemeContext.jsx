import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

//createContext is a built-in function provided by React
//that creates a Context object. We use this object to share data
//between components without passing props through every intermediate component.

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };