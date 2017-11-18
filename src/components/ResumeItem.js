import React from "react";

export default ({ job }) => (
  <section className="ResumeItem">
    <div className="ResumeItem-summary">
      {job.company && <h3>{job.company}</h3>}
      {job.role && <h4>{job.role}</h4>}
      {job.start && (
        <h4>
          {job.start} &mdash; {job.end}
        </h4>
      )}
    </div>
    <div className="ResumeItem-details">
      <p>{job.summary}</p>
      <ul>{job.points.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  </section>
);
