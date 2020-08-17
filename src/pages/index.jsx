import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default class Index extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <div>
        <Link to="/a">Hello</Link>
      </div>
    );
  }
}
