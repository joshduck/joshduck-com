import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Resume from "./pages/Resume";
import BlogHome from "./pages/BlogHome";
import Projects from "./pages/Projects";
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
            <Route path="/blog/" component={BlogHome} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
