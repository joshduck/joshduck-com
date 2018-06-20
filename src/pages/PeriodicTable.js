import React from "react";
import Page from "../components/Page";
import ActionLink from "../components/ActionLink";

export default () => (
  <Page title="404 Not Found">
    <h1>Periodic Table of HTML</h1>
    <p>The periodic table is long gone, replaced by a new mobile version.</p>
    <p>
      While you're here, you can read some of the{" "}
      <a href="https://www.sitepoint.com/the-periodic-table-of-the-html-5-elements/">
        coverage
      </a>{" "}
      of the original table, find out{" "}
      <a href="https://www.techdirt.com/articles/20150423/08252130770/designer-still-pursuing-bogus-takedown-periodic-table-html-elements-has-no-idea-how-copyright-works.shtml">
        what happened
      </a>{" "}
      to it or, visit{" "}
      <a href="https://madebymike.com.au/html5-periodic-table/">
        Mike Riethmuller's clone
      </a>.
    </p>
    <p>
      <ActionLink href="https://allthetags.com">Visit All The Tags</ActionLink>
    </p>
    <p>
      <a href="https://allthetags.com">
        <img
          src="/images/allthetags.png"
          alt="Preview of allthetags.com"
          width="600"
        />
      </a>
    </p>
  </Page>
);
