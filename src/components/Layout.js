import React, { useState, useEffect } from "react";

import Header from "./Header";

import "./Layout.css";

function Layout({ children }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const localStorage = window.localStorage;
    const currentTheme = localStorage.getItem("theme");
    if(currentTheme) {
      setTheme(currentTheme);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, []);

  function setThemeFromHeader(theme) {
    setTheme(theme);
    const localStorage = window.localStorage;
    localStorage.setItem("theme", theme);
  }

  return (
    <div className={`layout ${theme}`}>
      <Header setTheme={setThemeFromHeader} />
      {children}
    </div>
  );
}

export default Layout;