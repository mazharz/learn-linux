import React from "react";
import { Link as RouterLink } from "react-router-dom";

import "./Link.css";

function Link({ children, isNavLink, ...props }) {
  return (
    <RouterLink className={isNavLink ? "link--nav" : "link"} {...props}>
      {children}
    </RouterLink>
  );
}

export default Link;
