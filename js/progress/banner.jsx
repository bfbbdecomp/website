import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from "@material-ui/core";

export default class ProgressBanner extends React.Component {
  percentDone = () => {
    return this.props.state.linesPercent;
  };

  completionDate = () => {
    return "TODO";
  };

  asmPercent = () => {
    return (this.props.state.linesDone / this.props.state.lines) * 100;
  };

  funcPercent = () => {
    return (this.props.state.functionsDone / this.props.state.functions) * 100;
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4">
                Battle for Bikini Bottom is {this.percentDone()} decompiled
              </Typography>
              <Typography color="textSecondary">
                Estimated completion date: {this.completionDate()}.
              </Typography>
              {/* TODO: Make this have hover tooltips */}
              <LinearProgress
                variant="buffer"
                value={this.asmPercent()}
                valueBuffer={this.funcPercent()}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
