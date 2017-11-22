import React from "react";
import classnames from "classnames";
import "./Content.css";

export default ({ children, styled }) => (
  <article className={classnames({ Content: true, "Content-styled": styled })}>
    {children}
  </article>
);
