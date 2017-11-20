import React from "react";
import classnames from "classnames";
import "./Text.css";

export default ({ display, block, className, children }) => {
  const Element = block ? "div" : "span";
  const classNames = classnames(className, {
    Text: true,
    "Text-metadata": display === "metadata"
  });
  return <Element className={classNames}>{children}</Element>;
};
