import React from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import { markdown } from "markdown";
import Text from "./Text";
import "./BlogSummary.css";

export default ({ item }) => {
  const date = new Date(item.date);
  const target = `/blog/${item.permalink}`;

  return (
    <section>
      <header className="BlogSummary-header">
        <h2>
          <Link to={target}>{item.title}</Link>
        </h2>
        <Text display="metadata" block>
          Posted on{" "}
          <Link to={target}>
            <time time={item.date}>{dateformat(date, "dS mmmm yyyy")}</time>
          </Link>
        </Text>
      </header>
      <div
        dangerouslySetInnerHTML={{
          __html: markdown.toHTML(item.intro)
        }}
      />
      <p>
        <Link to={target}>Read more...</Link>
      </p>
    </section>
  );
};
