import React from "react";
import Helmet from "react-helmet";
import Content from "./Content";

export default ({ title, children, styled }) => (
  <div>
    <Helmet>
      <title>{title ? `${title} - Josh Duck` : "Josh Duck"}</title>
    </Helmet>
    <Content styled={styled == null || styled}>{children}</Content>
  </div>
);
