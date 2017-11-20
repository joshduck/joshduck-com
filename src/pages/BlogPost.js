import React, { Component } from "react";
import Page from "../components/Page";
import dateformat from "dateformat";
import Markdown from "../components/Markdown";
import Text from "../components/Text";
import manifest from "../data/blog.json";
import parseContent from "../utils/parseContent";
import "./BlogPost.css";

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    this.loadPost(props);
  }

  componentWillMount(props) {
    this.loadPost(this.props);
  }

  loadPost(props) {
    if (!props.match) {
      return;
    }
    const permalink = props.match.params.permalink;
    const entry = manifest.filter(entry => entry.permalink === permalink)[0];

    if (entry) {
      this.setState({ entry, body: null });

      fetch(`/${entry.markdown}`)
        .then(response => response.text())
        .then(text => this.setState({ body: parseContent(text).body }));
    }
  }

  render() {
    const { entry, body } = this.state;

    if (entry) {
      return (
        <Page title={entry.title}>
          <header className="BlogPost-header">
            <h1>{entry.title}</h1>
            <Text display="metadata" block>
              Posted on{" "}
              <time time={entry.date}>
                {dateformat(new Date(entry.date), "dS mmmm yyyy")}
              </time>
            </Text>
          </header>
          <Markdown content={body} />
        </Page>
      );
    }

    return null;
  }
}
