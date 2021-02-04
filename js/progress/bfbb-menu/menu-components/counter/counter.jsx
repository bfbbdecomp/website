import React from "react";
import "./counter.css";

export default class Counter extends React.Component {
  render() {
    const count = this.props.count;
    const total = this.props.total;
    const type = this.props.type;

    const countText = total ? `${count}/${total}` : count;

    return (
      <div className="counter">
        <div className={`${type}-img`}></div>
        <a className={`${type}-count`}>{countText}</a>
      </div>
    );
  }
}
