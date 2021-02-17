import React from "react";
import { makeTimeline } from "./chart";

export default class Timeline extends React.Component {
  state = {
    chart: null,
    showDowntime: true,
  };

  renderChart() {
    this.setState({
      chart: makeTimeline({
        showDowntime: this.state.showDowntime,
      }),
    });
  }

  componentDidMount() {
    this.renderChart();
  }

  toggleDowntime() {
    this.setState(
      {
        showDowntime: !this.state.showDowntime,
      },
      () => {
        this.renderChart();
      }
    );
  }

  render() {
    return (
      <div>
        <div id="timeline"></div>
      </div>
    );
  }
}
