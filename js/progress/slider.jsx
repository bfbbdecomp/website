import React from "react";
import { Grid, Slider } from "@material-ui/core";
import { COMMITS } from "../../data/commits";

export default class CommitSlider extends React.Component {
  state = {
    max: COMMITS.length - 1,
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Slider
            defaultValue={30}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={this.state.max}
          />
        </Grid>
      </Grid>
    );
  }
}
