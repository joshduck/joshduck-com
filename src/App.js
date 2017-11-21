import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Resume from "./pages/Resume";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Speaking from "./pages/Speaking";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/resume.html" component={Resume} />
            <Route path="/projects.html" component={Projects} />
            <Route path="/speaking.html" component={Speaking} />
            <Route path="/blog/" exact component={BlogIndex} />
            <Route path="/blog/:permalink(.+)" exact component={BlogPost} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
