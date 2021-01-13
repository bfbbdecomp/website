import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from "@material-ui/core";

export default class ProgressBanner extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4">
                Battle for Bikini Bottom is {5.2}% decompiled
              </Typography>
              <Typography color="textSecondary">
                Estimated completion date: April 20, 2025.
              </Typography>
              <LinearProgress variant="buffer" value={5.2} valueBuffer={13.1} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
