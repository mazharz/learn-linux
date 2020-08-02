import React, { useState } from "react";

import Link from "./Link";

import "./Header.css";

import config from "../config";

function Header({ setTheme }) {
  const [isThemeMenuShown, setIsThemeMenuShown] = useState(false);

  function toggleThemeMenu() {
    setIsThemeMenuShown(!isThemeMenuShown);
  }

  return (
    <header className="header">
      <div className="header__inner">
        <nav className="header__links">
          <Link isNavLink={true} to="/">
            Learn Linux
          </Link>
          <Link isNavLink={true} to="/chapters">
            Chapters
          </Link>
        </nav>
        <div className="theme">
          <button className="theme__button" onClick={toggleThemeMenu}>
            Themes
          </button>
          {isThemeMenuShown ? (
            <div className="theme__options">
              {config.themes.map((theme, index) => (
                <button
                  className="theme__option"
                  key={index}
                  onClick={() => setTheme(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
