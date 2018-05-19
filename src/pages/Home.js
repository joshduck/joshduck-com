import React from "react";
import Page from "../components/Page";
import SocialLinks from "../components/SocialLinks";
import "./Home.css";

export default () => (
  <Page styled={false}>
    <p className="Home-intro">
      <strong>Hi, I'm Josh</strong>
      <br />
      I'm an engineering manager, a frontend engineer, and speaker.<br />
      You'll find me in Brisbane, Australia.<br />
    </p>
    <SocialLinks />
  </Page>
);
