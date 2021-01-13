import React from "react";
import "./info-text.css";

export default class InfoText extends React.Component {
  render() {
    const amount = this.props.amount; 
    const text = this.props.children;
    const numberColor = this.props.color;
    const style = {'color': numberColor}

    return (
    <div class='info-text'>
        <a style={style} class='info-number'>{amount} </a>
        <a>{text}</a>
    </div>
    )
  }
}
