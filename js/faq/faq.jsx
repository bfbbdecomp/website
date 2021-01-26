import {
  Card,
  Grid,
  Typography,
  CardContent,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import About from "./about";

import "./faq.css";

export default class FAQ extends React.Component {
  state = {
    expanded: {},
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

  handleExpand = (id) => {
    const expanded = this.state.expanded;
    const value = this.state.expanded[id];
    expanded[id] = !value;
    this.setState({
      expanded,
    });
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
              <Card key={qa.id}>
                <CardContent>
                  <Typography variant="h6">{qa.q}</Typography>
                  <IconButton
                    className="closed"
                    onClick={() => {
                      this.handleExpand(qa.id);
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </CardContent>
                <Collapse in={this.state.expanded[qa.id]}>
                  <CardContent>
                    <Typography>{qa.a}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}
