import {
  CardHeader,
  Card,
  Grid,
  Typography,
  CardContent,
  Collapse,
} from "@material-ui/core";
import React from "react";
import About from "./about";

export default class FAQ extends React.Component {
  state = {
    section: 0,
    faq: [
      {
        name: "About",
        qa: About,
      },
      {
        name: "Contributing",
        qa: [],
      },
    ],
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={2}>
          {this.state.faq.map((section) => {
            return (
              <Grid key={section.name} container>
                <Grid item xs={12}>
                  <Typography>{section.name}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={10}>
          {this.state.faq[this.state.section].qa.map((qa) => {
            return (
              <Card key={qa}>
                <CardContent>
                  <Typography>{qa.q}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>{qa.a}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}
