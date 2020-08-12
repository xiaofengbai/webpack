import React, { Component } from "react";
import "./App.scss";
import "../style/css/index.css";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios({
      method: "post",
      url: "/api/user",
      timeout: 5000,
      data: {
        firstName: "1wefrg4hythty",
        lastName: "wfertfhmuiyt",
      },
    });
  }

  render() {
    return null;
  }
}
export default App;
