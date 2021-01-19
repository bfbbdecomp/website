import React from "react";
import { Grid } from "@material-ui/core";
import Timeline from "./timeline/timeline";
import Heatmap from "./heatmap/heatmap";
import ProgressBanner from "./banner";
import CommitSlider from "./slider";
import { COMMITS } from "../../data/commits";
import { getStateAtCommit } from "../helpers/functions";

export default class Overview extends React.Component {
  state = {
    repoState: getStateAtCommit(COMMITS.length - 1),
  };
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProgressBanner repoState={this.state.repoState} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Timeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <Heatmap />
        </Grid>
        {/*
        <Grid item xs={12}>
          <CommitSlider />
        </Grid>
        */}
      </Grid>
    );
  }
}
