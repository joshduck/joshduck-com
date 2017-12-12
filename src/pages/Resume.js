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
            I’m an <strong>engineering manager</strong> with twelve years of
            engineering experience building world class web apps. I’m passionate
            about building products that push the limits of what the web can do.
          </p>
          <p>
            I was one of Facebook's first frontend engineers and I've helped
            build and ship modern, best in class infrastructure like Relay.js
            and Draft.js.
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
