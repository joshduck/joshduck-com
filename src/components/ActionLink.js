import React from "react";
import "./ActionLink.css";

export default ({ href, children }) => (
  <a href={href} className="ActionLink">
    {children}
  </a>
);
