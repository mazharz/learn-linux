import React from "react";
import { Link as RouterLink } from "react-router-dom";

import "./Link.css";

function Link({ children, ...props }) {
  return(
    <RouterLink className="link" {...props}>{children}</RouterLink>
  );
}

export default Link;