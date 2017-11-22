import React from "react";
import Page from "../components/Page";
import ActionLink from "../components/ActionLink";

export default () => (
  <Page title="Error">
    <h1>404 Not Found</h1>
    <p>Sorry, looks like that page isn't there.</p>
    <br />
    <ActionLink href="/">Go Home</ActionLink>
  </Page>
);
