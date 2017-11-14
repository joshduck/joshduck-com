import React from "react";
import styled from "styled-components";

const links = [
  { id: "resume", href: "/resume.html", label: "Resume" },
  { id: "blog", href: "/blog.html", label: "Blog" },
  { id: "project", href: "/project.html", label: "Projects" }
];

const List = styled.ul`
  white-space: nowrap;
  margin-bottom: 0.1rem;
`;

const Item = styled.li`
  display: inline-block;
  margin: 0 0.1em 0 0;
  font-size: 1.4em;
  font-weight: bold;

  a span {
    margin: 0.25rem;
    line-height: 0.93em;
    display: inline-block;
    border-bottom: 2px solid transparent;
  }

  a span {
    display: inline-block;
  }

  a:hover {
    background: #45555e;
    color: #fff;
    text-shadow: none !important;
  }
`;

export default ({ page }) => (
  <List id="navigation" class="layout-content">
    {links.map((link, i) => (
      <Item key={i} class={page === link.id ? "navigation-active" : ""}>
        <a href={link.href}>
          <span>{link.label}</span>
        </a>
      </Item>
    ))}
  </List>
);
