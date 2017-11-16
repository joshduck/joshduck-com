import React from "react";
import "./Navigation.css";

const links = [
  { id: "resume", href: "/resume.html", label: "Resume" },
  { id: "blog", href: "/blog.html", label: "Blog" },
  { id: "project", href: "/project.html", label: "Projects" }
];

export default ({ page, className }) => (
  <ul className={"Navigation Layout-content " + className}>
    {links.map((link, i) => (
      <li key={i} className={page === link.id ? "Navigation-active" : ""}>
        <a href={link.href}>
          <span>{link.label}</span>
        </a>
      </li>
    ))}
  </ul>
);
