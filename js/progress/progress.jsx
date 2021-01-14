import React from "react";
import { Grid, Toolbar, Tabs, Tab } from "@material-ui/core";
import Timeline from "./timeline/timeline";
import Heatmap from "./heatmap/heatmap";
import ProgressBanner from "./banner";
// import Menu from "./bfbb-menu/menu";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,

      /*
      // Placeholder Menu Values
      contributors: [],
      spatulaCount: 0,
      shinyCount: 0,
      sockCount: 0,
      collectableCount: 0,
      collectableTotal: 0,
      commitCount: 0,
      contributorCount: 0,
      pullRequestCount: 0,
      */
    };
  }

  componentDidMount() {
    /* this logic should probably be moved into the menu component
    // Load top 5 contributors, total commits, and contributor count
    fetch("https://api.github.com/repos/bfbbdecomp/bfbb/contributors")
      .then((response) => response.json())
      .then((data) => {
        let dataShort = data.slice(0, 5);
        let contributors = [];
        for (let item of dataShort) {
          let contributor = {
            name: item.login,
            profileImg: item.avatar_url,
            profileUrl: item.url,
          };
          contributors.push(contributor);
        }
        let commits = 0;
        for (let item of data) {
          commits += item.contributions;
        }
        this.setState({
          contributors: contributors,
          commitCount: commits,
          contributorCount: data.length,
        });
      });

    // Load number of active PRs
    fetch("https://api.github.com/repos/bfbbdecomp/bfbb/pulls")
      .then((response) => response.json())
      .then((data) => {
        let length = data.length;
        this.setState({
          pullRequestCount: length,
        });
      });
      */
  }

  handleChange = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Toolbar>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            value={this.state.tab}
          >
            <Tab tabIndex={0} label="Overview" />
            <Tab tabIndex={1} label="Contributors" />
            <Tab tabIndex={2} label="Functions" />
          </Tabs>
        </Toolbar>
        <Grid item xs={12}>
          <ProgressBanner />
        </Grid>
        <Grid item xs={12} md={6}>
          <Timeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <Heatmap />
        </Grid>
        {/*
        <Menu
          contributors={this.state.contributors}
          spatulaCount={this.state.spatulaCount}
          shinyCount={this.state.shinyCount}
          sockCount={this.state.sockCount}
          collectableCount={this.state.collectableCount}
          collectableTotal={this.state.collectableTotal}
          commitCount={this.state.commitCount}
          contributorCount={this.state.contributorCount}
          pullRequestCount={this.state.pullRequestCount}
        />
        */}
      </Grid>
    );
  }
}
