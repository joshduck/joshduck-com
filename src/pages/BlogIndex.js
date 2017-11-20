import React from "react";
import Page from "../components/Page";
import manifest from "../data/blog.json";
import BlogSummary from "../components/BlogSummary";

export default () => (
  <Page title="Blog">
    <h1>Bloooog</h1>
    {manifest
      .slice()
      .reverse()
      .map((item, i) => <BlogSummary key={i} item={item} />)}
  </Page>
);
