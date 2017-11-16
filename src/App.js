import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header page="blog" />
        <Content>
          <h1>Hello</h1>
          <h2>Hello</h2>
          <p>Hello</p>
          <p>Hello</p>
          <ul>
            <li>One</li>
            <li>Two</li>
          </ul>
          <p>
            <a href="#">Hello</a>
          </p>
        </Content>
      </div>
    );
  }
}

export default App;
