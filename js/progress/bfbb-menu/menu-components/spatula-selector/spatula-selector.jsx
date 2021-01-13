import React from "react";
import "./spatula-selector.css";

import Spatula from "./spatula";

import move_1 from "../../sounds/move_1.wav"
import step_1 from "../../sounds/step_1.wav"
import step_2 from "../../sounds/step_2.wav"
import spatula_select from "../../sounds/spatula_select.wav"

const spatulas = require('../../spatulas.json');

const move_sound = new Audio(move_1);
move_sound.volume = 0.2;

const step_sound_1 = new Audio(step_1);
step_sound_1.volume = 0.2;

const step_sound_2 = new Audio(step_2);
step_sound_2.volume = 0.2;

const spatula_select_sound = new Audio(spatula_select);
spatula_select_sound.volume = 0.2;

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
      selectedArea: state.selectedArea > 0 ? state.selectedArea - 1 : spatulas.length - 1,
      selectedSpatula: 0,
    }), () => {
      move_sound.currentTime=0;
      move_sound.play()
    })
  }

  downJellyfishClick = () => {
    this.setState((state, props) => ({
      selectedArea: state.selectedArea < spatulas.length - 1 ? state.selectedArea + 1 : 0,
      selectedSpatula: 0,
    }), () => {
      move_sound.currentTime=0;
      move_sound.play()
    })
  }

  onAreaBubbleClick = (index) => {
    const currentIndex = this.state.selectedArea;
    this.setState((state, props) => ({
      selectedArea: index,
      selectedSpatula: 0,
    }), () => {
      if (currentIndex !== this.state.selectedArea) {
        move_sound.currentTime=0;
        move_sound.play()
      }
    })
  }

  onSpatulaHover = (index) => {
    const currentIndex = this.state.selectedSpatula;
    this.setState((state, props) => ({
      selectedSpatula: index,
    }), () => {
      if (currentIndex !== this.state.selectedSpatula) {
        if (currentIndex > this.state.selectedSpatula) {
          step_sound_1.currentTime=0;
          step_sound_1.play()
        }
        else {
          step_sound_2.currentTime=0;
          step_sound_2.play()
        }
      }
    })
  }

  onSpatulaClick = () => {
    spatula_select_sound.currentTime=0;
    spatula_select_sound.play()
  }


  render() {
    const spatulaCount = this.props.spatulaCount;
    const previousAreas = spatulas.slice(0, this.state.selectedArea)
    let totalPreviousSpatulas = 0;
    for (let area of previousAreas) {
      totalPreviousSpatulas += area.spatulas.length
    }

    return (
      <>
        <div className="area-selector">
          <div className="inner-selector">
            <div className="jellyfish" id="jellyfish-up" onClick={() => {this.upJellyfishClick()}}></div>
            {spatulas.map((area, index)=>(
              <div className="area-bubble" id={this.state.selectedArea === index ? 'area-bubble-selected' : ''} key={index} onClick={() => {this.onAreaBubbleClick(index)}}></div>
            ))}
            <div className="jellyfish" id="jellyfish-down" onClick={() => {this.downJellyfishClick()}}></div>
          </div>
        </div>
        <div className="spatula-selector">
          <p id="area-title">{spatulas[this.state.selectedArea].level}</p>
          <div className="spatula-container">
            {spatulas[this.state.selectedArea].spatulas.map((spatula, index) => (
              <div key={index} onMouseOver={() => {this.onSpatulaHover(index)}} onClick={() => {this.onSpatulaClick()}}>
                <Spatula key={index} gold={spatulaCount - totalPreviousSpatulas > index} selected={index === this.state.selectedSpatula}></Spatula>
              </div>
            ))}
          </div>
          <p id="spatula-name">{spatulas[this.state.selectedArea].spatulas[this.state.selectedSpatula]}</p>
        </div>
      </>
    );
  }
}
