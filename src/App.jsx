import React, { Component } from "react";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import Index from "./pages";
import Index1 from "./pages/index1";
import Error from "./pages/_error";
import "./App.scss";
import "../style/css/index.css";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios({
      method: "get",
      url: "/api/user",
      timeout: 5000,
      data: {
        firstName: "1wefrg4hythty",
        lastName: "wfertfhmuiyt",
      },
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter basename="pa">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/a" component={Index1} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
