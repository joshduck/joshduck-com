import React, { Component } from "react";
import Page from "./components/Page";
import ResumeItem from "./components/ResumeItem";

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: null };
  }

  componentDidMount() {
    fetch("/data/resume.json")
      .then(req => req.json())
      .then(data => {
        this.setState({ jobs: data });
      });
  }

  render() {
    return (
      <Page title="Resume">
        <h1>About Me</h1>
        <p>
          I’m an <strong>engineering manager</strong> with over twelve years of
          engineering experience building web apps. I’m passionate about
          building great products that push the limits of what the web can do.
          I've helped build and ship modern, best in class infrastructure like
          Relay.js and Draft.js.
        </p>
        {this.state.jobs &&
          this.state.jobs.map((job, i) => <ResumeItem key={i} job={job} />)}
      </Page>
    );
  }
}
