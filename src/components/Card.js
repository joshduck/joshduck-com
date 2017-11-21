import React from "react";
import { Link } from "react-router-dom";

import Markdown from "../components/Markdown";
import Text from "../components/Text";
import ActionLink from "../components/ActionLink";
import "./Card.css";

const CardLink = ({ href, children }) => {
  if (href.indexOf("://") === -1) {
    return <Link to={href}>{children}</Link>;
  } else {
    return <a href={href}>{children}</a>;
  }
};

export default ({ title, metadata, body, actions, href }) => {
  return (
    <section className="Card">
      <header className="Card-header">
        <h2>
          <CardLink href={href}>{title}</CardLink>
        </h2>
        {metadata && (
          <Text display="metadata" block>
            {metadata}
          </Text>
        )}
      </header>
      <Markdown content={body} />
      {actions &&
        Object.keys(actions).map(url => (
          <ActionLink key={url} href={url}>
            {actions[url]}
          </ActionLink>
        ))}
    </section>
  );
};
