import React from "react";
import Page from "../components/Page";
import CardGrid from "../components/CardGrid";
import Card from "../components/Card";
import projects from "../data/projects.json";

export default () => (
  <Page title="Projects">
    <h1>Projects and Hacks</h1>
    <CardGrid>
      {projects.map((project, i) => (
        <Card
          key={i}
          title={project.name}
          metadata={project.subtitle}
          href={Object.keys(project.urls)[0]}
          actions={project.urls}
          body={project.description}
        />
      ))}
    </CardGrid>
  </Page>
);
