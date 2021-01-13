import React from "react";
import "./spatula-selector.css";

import Spatula from "./spatula";

const spatulas = require('../../spatulas.json');

export default class SpatulaSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArea: 0,
      selectedSpatula: 0,
    };
  }

  upJellyfishClick = () => {
    this.setState((state, props) => ({
      selectedArea: state.selectedArea > 0 ? state.selectedArea - 1 : spatulas.length - 1
    }))
  }

  downJellyfishClick = () => {
    this.setState((state, props) => ({
      selectedArea: state.selectedArea < spatulas.length - 1 ? state.selectedArea + 1 : 0
    }))
  }

  onSpatulaHover = (index) => {
    this.setState((state, props) => ({
      selectedSpatula: index
    }))
  }


  render() {
    return (
      <>
        <div className="area-selector">
          <div className="inner-selector">
            <div className="jellyfish" id="jellyfish-up" onClick={() => {this.upJellyfishClick()}}></div>
            {spatulas.map((area, index)=>(
              <div className="area-bubble" id={this.state.selectedArea === index ? 'area-bubble-selected' : ''} key={index}></div>
            ))}
            <div className="jellyfish" id="jellyfish-down" onClick={() => {this.downJellyfishClick()}}></div>
          </div>
        </div>
        <div className="spatula-selector">
          <p id="area-title">{spatulas[this.state.selectedArea].level}</p>
          <div className="spatula-container">
            {spatulas[this.state.selectedArea].spatulas.map((spatula, index) => (
              <div key={index} onMouseOver={() => {this.onSpatulaHover(index)}}>
                <Spatula key={index}></Spatula>
              </div>
            ))}
          </div>
          <p id="spatula-name">{spatulas[this.state.selectedArea].spatulas[this.state.selectedSpatula]}</p>
        </div>
      </>
    );
  }
}
