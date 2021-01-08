import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/progress">Progress</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    );
  }
}
