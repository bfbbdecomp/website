import React from "react";
import "./bubbles.css";

export default class Bubble extends React.Component {
  render() {
    const img = this.props.profileImg;
    const alt = this.props.alt;

    const profileUrl = this.props.profileUrl;

    return (
      <div className="bubble">
        <img
          src={img}
          alt={alt}
          className="profile-pic"
          onClick={() => {
            window.location.href = profileUrl;
          }}
        />
      </div>
    );
  }
}
