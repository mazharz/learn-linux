import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Chapters from "./pages/Chapters";
import Chapter from "./pages/Chapter";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chapters">
          <Chapters />
        </Route>
        <Route path="/chapter/:chapter">
          <Chapter />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
