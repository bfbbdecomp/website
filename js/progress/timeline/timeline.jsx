import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { HourglassEmptyOutlined, HourglassFull } from "@material-ui/icons";
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showDowntime}
                color="primary"
                onChange={() => this.toggleDowntime()}
              />
            }
            label="Show Downtime"
          />
        </FormGroup>
      </div>
    );
  }
}
