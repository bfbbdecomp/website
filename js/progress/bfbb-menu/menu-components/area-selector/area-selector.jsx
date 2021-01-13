import React from "react";
import "./area-selector.css";

export default class AreaSelector extends React.Component {
  render() {
    const selectedArea = this.props.selectedArea;

    return (
    <div className='area-selector'>
        <div className='inner-selector'>
            <div className='jellyfish' id='jellyfish-up'></div>
            <div className='area-bubble' id='area-bubble-selected'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='area-bubble'></div>
            <div className='jellyfish' id='jellyfish-down'></div>
        </div>
    </div>
    )
  }
}
