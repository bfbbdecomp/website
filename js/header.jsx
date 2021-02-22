import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: window.location.pathname.split("/").slice(-1)[0] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue }, () => {
      if (this.state.value === "github") {
        window.location.href = "https://www.github.com/bfbbdecomp/";
      } else if (this.state.value === "discord") {
        window.location.href = "https://discord.gg/zEr6u3mRWe";
      }
    });
  };

  render() {
    console.log(this.state.value);
    return (
      <div id="header">
        <div>
          <a href="#">About</a>
        </div>
        <div>
          <a href="#">Progress</a>
        </div>
      </div>
    );
  }
}
