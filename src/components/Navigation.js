import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const links = {
  "/blog/": "Blog",
  "/speaking.html": "Speaking",
  "/projects.html": "Projects",
  "/resume.html": "Resume"
};

export default ({ className }) => (
  <ul className={"Navigation Layout-content " + className}>
    {Object.keys(links).map((href, i) => (
      <li key={i}>
        <NavLink to={href} activeClassName="Navigation-active">
          <span>{links[href]}</span>
        </NavLink>
      </li>
    ))}
  </ul>
);
