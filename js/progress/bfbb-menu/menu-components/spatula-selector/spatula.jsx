import React from "react";
import "./spatula.css";

export default class Spatula extends React.Component {
  render() {
    const gold = this.props.gold;
    const selected = this.props.selected;

    const className = gold ? "gold-spatula" : "silver-spatula";
    const id = selected ? "selected-spatula" : "";

    return (
      <div className="spat-container" id={id}>
        <div className={className}></div>
      </div>
    );
  }
}
