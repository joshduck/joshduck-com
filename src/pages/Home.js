import React from "react";
import Page from "../components/Page";
import SocialLinks from "../components/SocialLinks";
import "./Home.css";

export default () => (
  <Page styled={false}>
    <p className="Home-intro">
      I work with React, Relay and Node. I'm passionate about making the web
      fast and building best in class infrastructure.
    </p>
    <SocialLinks />
  </Page>
);
