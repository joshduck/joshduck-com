import React from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";

import Page from "../components/Page";
import manifest from "../data/blog.json";
import Card from "../components/Card";

const Permalink = ({ href, date }) => (
  <span>
    Posted on{" "}
    <Link to={href}>
      <time time={date}>{dateformat(date, "dS mmmm yyyy")}</time>
    </Link>
  </span>
);

const Post = ({ item }) => {
  const target = `/blog/${item.permalink}`;
  return (
    <Card
      title={item.title}
      body={item.intro}
      metadata={<Permalink href={target} date={item.date} />}
      href={target}
      actions={{ [target]: "Read More..." }}
    />
  );
};

export default () => (
  <Page title="Blog">
    <h1>Bloooog</h1>
    {manifest
      .slice()
      .reverse()
      .map((item, i) => <Post key={i} item={item} />)}
  </Page>
);
