import React from "react";
import "./spatula.css";

export default class Spatula extends React.Component {
  render() {
    const gold = this.props.gold;

    const classname = gold ? 'gold-spatula' : 'silver-spatula';

    return (
    <div class='spat-container'>
        <div class={classname}></div>
    </div>
    )
  }
}
