import React from "react";
import Page from "../components/Page";
import ResumeItem from "../components/ResumeItem";
import ResponsiveSection from "../components/ResponsiveSection";
import data from "../data/resume.json";

export default () => (
  <Page title="Resume">
    <ResponsiveSection
      header={<h1>About Me</h1>}
      body={
        <div>
          <p>
            I’m an engineering mananger with twelve years of
            engineering experience building world class products. I’m passionate
            about building products that redefine the limits of the web.
          </p>
          <p>
            I was one of Facebook's first frontend engineers and have contributed
            to groundbreaking projects like React, Relay.js and Draft.js.
          </p>
        </div>
      }
    />
    <h2>Work</h2>
    {data.work.map((item, i) => <ResumeItem key={i} item={item} />)}
    <h2>Education</h2>
    {data.education.map((item, i) => <ResumeItem key={i} item={item} />)}
  </Page>
);
