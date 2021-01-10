import React from "react";
import Header from "./header";
import { Grid } from "@material-ui/core";

export default class App extends React.Component {
  render() {
    const Page = this.props.page;
    return (
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Page />
        </Grid>
      </Grid>
    );
  }
}
