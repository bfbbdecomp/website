import React from "react";
import "./bubbles.css";

export default class Bubble extends React.Component {

  redirect = (profileUrl) => {
    window.location.href = profileUrl;
  }

  render() {
    const img = this.props.profileImg;
    const alt = this.props.alt;

    const profileUrl = this.props.profileUrl

    return (
    <div class='bubble'>
        <img src={img} alt={alt} class='profile-pic' onClick={() => {this.redirect(profileUrl)}} />
    </div>
    )
  }
}
