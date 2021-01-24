import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import FunctionTable from "./table";
import { FUNCTIONS } from "../../../data/functions";

export default class FunctionPage extends React.Component {
  state = {
    limit: 50,
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form>
            <TextField
              id="limit"
              label="Rows"
              onChange={this.handleChange}
              value={this.state.limit}
            />
          </form>
          <Typography>Some information/buttons, etc. here</Typography>
        </Grid>
        <Grid item xs={12}>
          <FunctionTable
            funcs={Object.keys(FUNCTIONS)}
            limit={this.state.limit}
          />
        </Grid>
      </Grid>
    );
  }
}
