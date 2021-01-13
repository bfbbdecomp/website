import React from "react";
import "./bubbles.css";

export default class Bubble extends React.Component {
  render() {
    const img = this.props.profileImg

    return (
    <div class='bubble'>
        <img src={img} class='profile-pic' />
    </div>
    )
  }
}
