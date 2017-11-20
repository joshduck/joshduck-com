import React from "react";
import ResponsiveSection from "./ResponsiveSection";
import Text from "./Text";
import "./ResumeItem.css";

export default ({ item }) => {
  const { company, role, start, end, summary, points } = item;
  return (
    <ResponsiveSection
      className="ResumeItem"
      withDivider
      header={
        <div>
          {company && <h3 className="ResumeItem-company">{company}</h3>}
          {role && (
            <Text display="metadata" block>
              {role}
            </Text>
          )}
          {start && (
            <Text display="metadata" block>
              {start} &mdash; {end}
            </Text>
          )}
        </div>
      }
      body={
        <div>
          <p>{summary}</p>
          <ul>{points.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      }
    />
  );
};
