import React from "react";
import "./area-selector.css";

export default class AreaSelector extends React.Component {
  render() {
    const selectedArea = this.props.selectedArea;

    return (
    <div class='area-selector'>
        <div class='inner-selector'>
            <div class='jellyfish' id='jellyfish-up'></div>
            <div class='area-bubble-selected'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='area-bubble'></div>
            <div class='jellyfish' id='jellyfish-down'></div>
        </div>
    </div>
    )
  }
}
