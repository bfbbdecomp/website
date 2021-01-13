import React from "react";
import "./spatula-selector.css";

import Spatula from "./spatula"

export default class SpatulaSelector extends React.Component {
  render() {
    const selectedSpatula = this.props.selectedSpatula;

    return (
    <div className='spatula-selector'>
        <p id='area-title'>Bikini Bottom</p>
        <div className='spatula-container'>
            <Spatula gold={true}></Spatula>
            <Spatula gold={true}></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
        </div>
        <p id='spatula-name'>On top of the pineapple</p>
    </div>
    )
  }
}
