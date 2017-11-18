import React from "react";
import classnames from "classnames";
import "./ResponsiveSection.css";

export default ({ className, header, body, withDivider }) => {
  return (
    <section
      className={classnames(className, {
        ResponsiveSection: true,
        "ResponsiveSection-withDivider": withDivider
      })}
    >
      <div className="ResponsiveSection-header">{header}</div>
      <div className="ResponsiveSection-body">{body}</div>
    </section>
  );
};
