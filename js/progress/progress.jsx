import React from "react";
import { Grid, Toolbar, Tabs, Tab, Typography } from "@material-ui/core";
import Overview from "./overview";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  /*
    TODO: make this tab switch not re-render components,
    but rather hide/display them via CSS to avoid
    recalculating HTML every time it's changed.
  */
  renderTab = () => {
    switch (this.state.tab) {
      case 0:
        return <Overview />;
      default:
        return <Typography>TODO</Typography>;
    }
  };

  componentDidMount() {}

  handleChange = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Toolbar>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              value={this.state.tab}
            >
              <Tab tabIndex={0} label="Overview" />
              <Tab tabIndex={1} label="Functions" />
              <Tab tabIndex={2} label="Contributors" />
            </Tabs>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          {this.renderTab()}
        </Grid>
      </Grid>
    );
  }
}
