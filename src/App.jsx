import React, { Component } from "react";
import { baseUrl } from "utils/cdnConfig";
import _ from "lodash";
import "./App.scss";
import Test from "./pages/Test";
export default class App extends Component {
  state = {
    obj: 1111,
  };
  componentDidMount() {
    const { ASSET_PREFIX } = process.env;
    console.log(ASSET_PREFIX);
    this.setState((pre, props) => {
      return props;
    });
    setTimeout(() => {
      this.setState({
        obj: 33313,
      });
    }, 3000);
  }

  render() {
    const { obj } = this.state;
    // _.concat([3, 4], [1, 2]);
    return (
      <div>
        <Test />
        <img
          src={`${baseUrl}/images/timg.jpeg`}
          style={{ width: "400px" }}
          alt=""
        />
        <div className="wrap1">
          <div className="left">{obj}</div>
          <div className="center">2</div>
          <div className="right">3</div>
        </div>
        <div className="wrap2">
          <div className="left">1</div>
          <div className="right">2</div>
        </div>
        <div className="wrap3">
          <div className="left">1</div>
          <div className="right">2</div>
        </div>
      </div>
    );
  }
}
