import React from "react";
import "./counter.css";

export default class Counter extends React.Component {
  render() {
    const count = this.props.count;
    const type = this.props.type;

    return (
    <div class='counter'>
        <div class={`${type}-img`}></div>
        <a class='count'>{count}</a>
    </div>
    )
  }
}
