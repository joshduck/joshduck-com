import React from "react";
import Page from "../components/Page";
import Card from "../components/Card";
import CardGrid from "../components/CardGrid";
import data from "../data/talks.json";

export default () => (
  <Page title="Speaking">
    <h1>Speaking</h1>
    <CardGrid>
      {data.map((item, i) => (
        <Card
          key={i}
          title={item.name}
          href={Object.keys(item.urls)[0]}
          actions={item.urls}
          body={item.description}
          metadata={item.venue}
        />
      ))}
    </CardGrid>
  </Page>
);
