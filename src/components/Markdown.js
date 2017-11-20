import React, { Component } from "react";
import marked from "marked";

export default class Markdown extends Component {
  componentDidUpdate() {
    const hljs = window && window.hljs;
    Array.from(this.refs.root.querySelectorAll("pre code")).forEach(block => {
      hljs && hljs.highlightBlock(block);
    });
  }

  render() {
    const content = this.props.content;
    return (
      <div
        ref="root"
        dangerouslySetInnerHTML={{ __html: content && marked(content) }}
      />
    );
  }
}
