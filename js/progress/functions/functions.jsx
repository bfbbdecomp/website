import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FunctionTable from "./table";

export default class FunctionPage extends React.Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Some information/buttons, etc. here</Typography>
        </Grid>
        <Grid item xs={12}>
          <FunctionTable />
        </Grid>
      </Grid>
    );
  }
}
