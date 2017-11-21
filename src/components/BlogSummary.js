import React from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import Markdown from "./Markdown";
import Text from "./Text";
import "./BlogSummary.css";

export default ({ item }) => {
  return (
    <section>
      <header className="BlogSummary-header">
        <h2>
          <Link to={target}>{item.title}</Link>
        </h2>
        <Text display="metadata" block />
      </header>
      <Markdown content={item.intro} />
      <p>
        <Link to={target}>Read more...</Link>
      </p>
    </section>
  );
};
