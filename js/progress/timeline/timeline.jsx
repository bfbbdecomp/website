import React from "react";
import { makeTimeline } from "./chart";

export default class Timeline extends React.Component {
  state = {
    chart: null,
  };

  renderChart() {
    this.setState({ chart: makeTimeline() });
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    // Check needed to prevent infinite update loop
    if (this.props !== prevProps) {
      this.renderChart();
    }
  }

  render() {
    return <div id="timeline"></div>;
  }
}
