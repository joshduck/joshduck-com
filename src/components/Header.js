import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import "./Header.css";

export default ({ showPersonalInfo }) => (
  <header className="Header">
    <div className="Header-content">
      <Link to="/" className="Header-logo">
        Josh Duck
      </Link>
      <Navigation className="Header-navigation" />
    </div>
  </header>
);
