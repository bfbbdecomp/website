import React from "react";
import "./menu.css";

import Bubble from "./menu-components/bubbles/basebubble";

export default class Menu extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="menu">
          <div class="bubbles">
            <a><Bubble></Bubble></a>
            <a><Bubble></Bubble></a>
            <a><Bubble></Bubble></a>
            <a><Bubble></Bubble></a>
            <a><Bubble></Bubble></a>
          </div>
        </div>
        ;
      </div>
    );
  }
}
