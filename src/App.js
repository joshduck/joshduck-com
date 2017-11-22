import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Speaking from "./pages/Speaking";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/resume.html" exact component={Resume} />
              <Route path="/projects.html" exact component={Projects} />
              <Route path="/speaking.html" exact component={Speaking} />
              <Route path="/blog/" exact component={BlogIndex} />
              <Route path="/blog/:permalink(.+)" exact component={BlogPost} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
