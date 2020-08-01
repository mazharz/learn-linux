import React, { useState, useEffect } from "react";

import Header from "./Header";

import "./Layout.css";

function Layout({ children }) {
  const [theme, setTheme] = useState("red-dark");

  useEffect(() => {
    const localStorage = window.localStorage;
    const currentTheme = localStorage.getItem("theme");
    if(currentTheme) {
      setTheme(currentTheme);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, []);

  return (
    <div className={`layout ${theme}`}>
      <Header setTheme={(theme) => setTheme(theme)} />
      {children}
    </div>
  );
}

export default Layout;