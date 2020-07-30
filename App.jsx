import React, { Component } from "react";
import { $imgUrl } from "./src/utils/cdnConfig";
import "./App.scss";
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
    return (
      <div>
        <img src={`${$imgUrl}/images/timg.jpeg`} alt="" />
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
