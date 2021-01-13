import React from "react";
import "./spatula.css";

export default class Spatula extends React.Component {
  render() {
    const gold = this.props.gold;
    const selected = this.props.selected;

    const className = gold ? 'gold-spatula' : 'silver-spatula';

    return (
    <div className='spat-container'>
        <div className={className}></div>
    </div>
    )
  }
}
