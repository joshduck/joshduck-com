import React from "react";
import Navigation from "./Navigation";
import "./Header.css";

export default ({ showPersonalInfo, page }) => (
  <header className="Header">
    <div className="Header-content">
      <a href="/" className="Header-logo">
        Josh Duck
      </a>
      <Navigation page={page} className="Header-navigation" />
    </div>
  </header>
);
