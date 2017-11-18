import React from "react";
import ResponsiveSection from "./ResponsiveSection";
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
          {role && <div className="ResumeItem-role">{role}</div>}
          {start && (
            <div className="ResumeItem-period">
              {start} &mdash; {end}
            </div>
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
