import { useEffect, useState } from "react";

const THEMES = {
  light: {
    backgroundColor: "#fff",
    color: "#000",
  },
  dark: {
    backgroundColor: "#000",
    color: "#fff",
  },
};

function ThemeToggle() {
  const themeKey = "theme";
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(themeKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else {
      localStorage.setItem(themeKey, "light");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(themeKey, newTheme);
  };

  return (
    <div
      style={{
        ...THEMES[theme],
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          padding: "0.5rem 1rem",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          backgroundColor: theme === "light" ? "#000" : "#fff",
          color: theme === "light" ? "#fff" : "#000",
        }}
        aria-label="Switch theme"
      >
        Switch Theme
      </button>

      <p>Current Theme: {theme}</p>
    </div>
  );
}

export default ThemeToggle;
