import React from "react";
import Page from "../components/Page";
import ResponsiveSection from "../components/ResponsiveSection";
import data from "../data/projects.json";

import Markdown from "../components/Markdown";
import Text from "../components/Text";

const Project = ({ project }) => {
  console.log(project);
  return (
    <section>
      <h2>
        <a href={project.url}>{project.name}</a>
      </h2>
      <Text display="metadata">{project.venue}</Text>
      <Markdown content={project.description} />
      <p>
        <a href={project.url}>More</a>
      </p>
      <p>
        <a href={project.youtube}>Watch</a>
      </p>
    </section>
  );
};

export default () => (
  <Page title="Projects">
    <h1>Resume</h1>
    {data.projects.map(project => <Project project={project} />)}
    {data.github.map(project => <Project project={project} />)}
    {data.speaking.map(project => <Project project={project} />)}
  </Page>
);
