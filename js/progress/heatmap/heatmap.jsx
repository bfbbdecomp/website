import React from "react";
import { makeHeatmap } from "./chart";

export default class Timeline extends React.Component {
  state = {
    chart: null,
  };

  renderChart() {
    this.setState({ chart: makeHeatmap() });
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return <div id="heatmap"></div>;
  }
}
