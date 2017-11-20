import React, { Component } from "react";
import { markdown } from "markdown";
import Page from "../components/Page";
import ResponsiveSection from "../components/ResponsiveSection";
import manifest from "../data/blog.json";

export default class BlogHome extends Component {
  render() {
    return (
      <Page title="Blog">
        <h1>Bloooog</h1>
        {manifest.reverse().map(item => {
          return (
            <section>
              <h2>{item.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdown.toHTML(item.intro)
                }}
              />
            </section>
          );
        })}
      </Page>
    );
  }
}
