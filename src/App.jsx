import React, { Component } from "react";
import { baseUrl } from "utils/cdnConfig";
import _ from "lodash/_arrayShuffle";
import "./App.scss";
import "../style/css/index.css";
import { cube } from "./utils/texttree";
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
    console.log(cube(31));
  }

  render() {
    const { obj } = this.state;
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
          <div className="center">
            <i className="el-icon-delete"></i>
            侧额发二哥明天让你问好；OK你个urhlkgnebruhiglkjernbjge{" "}
          </div>
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
