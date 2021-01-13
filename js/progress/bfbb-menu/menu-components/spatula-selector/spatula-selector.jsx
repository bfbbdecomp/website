import React from "react";
import "./spatula-selector.css";

import Spatula from "./spatula";

export default class SpatulaSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArea: 0,
      selectedSpatula: 0,
    };
  }


  render() {
    return (
      <>
        <div className="area-selector">
          <div className="inner-selector">
            <div className="jellyfish" id="jellyfish-up"></div>
            <div className="area-bubble" id="area-bubble-selected"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="area-bubble"></div>
            <div className="jellyfish" id="jellyfish-down"></div>
          </div>
        </div>
        <div className="spatula-selector">
          <p id="area-title">Bikini Bottom</p>
          <div className="spatula-container">
            <Spatula gold={true}></Spatula>
            <Spatula gold={true}></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
            <Spatula></Spatula>
          </div>
          <p id="spatula-name">On top of the pineapple</p>
        </div>
      </>
    );
  }
}
