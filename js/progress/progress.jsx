import React from "react";
import { Grid, Toolbar, Tabs, Tab } from "@material-ui/core";
import Timeline from "./timeline/timeline";
import Heatmap from "./heatmap/heatmap";
import ProgressBanner from "./banner";

export default class Progress extends React.Component {
  state = {
    tab: 0,
  };

  handleChange = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Toolbar>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            value={this.state.tab}
          >
            <Tab tabIndex={0} label="Overview" />
            <Tab tabIndex={1} label="Contributors" />
            <Tab tabIndex={2} label="Functions" />
          </Tabs>
        </Toolbar>
        <Grid item xs={12}>
          <ProgressBanner />
        </Grid>
        <Grid item xs={12} md={6}>
          <Timeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <Heatmap />
        </Grid>
      </Grid>
    );
  }
}
