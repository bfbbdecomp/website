import React from "react";
import "./spatcount.css";

export default class SpatCount extends React.Component {
  render() {
    const count = this.props.count;

    return (
    <div class='spatula-count'>
        <div class='spatula-img'></div>
        <a class='count'>{count}</a>
    </div>
    )
  }
}
