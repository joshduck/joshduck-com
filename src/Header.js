import React from "react";
import Navigation from "./Navigation";

export default ({ showPersonalInfo, page }) => (
  <div id="header-wrapper">
    <div id="header" class="layout-section">
      <h1 id="banner" class="layout-gutter">
        <a href="/">Josh Duck</a>
      </h1>
      <Navigation page={page} />
    </div>
  </div>
);
