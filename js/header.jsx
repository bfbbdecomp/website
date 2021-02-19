import React from "react";
import { Link as RouterLink } from "react-router-dom";

import "../css/header.css";

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
      <div id="header" className="flex p-3 shadow text-2xl text-center">
        <div className="flex flex-grow space-x-6">
          <div className="p-2.5 link clicked rounded-md">
            <a className="uppercase bobfont" href="#">
              Progress
            </a>
          </div>
          <div className="p-2.5 link">
            <a className="uppercase bobfont" href="#">
              FAQ
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="p-2.5 link">
            <a className="uppercase bobfont" href="#">
              GitHub
            </a>
          </div>
          <div className="p-2.5 link">
            <a className="uppercase bobfont" href="#">
              Discord
            </a>
          </div>
        </div>
      </div>
    );
  }
}
