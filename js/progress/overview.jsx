import React from "react";
import { Grid, Modal } from "@material-ui/core";
import Timeline from "./timeline/timeline";
import Heatmap from "./heatmap/heatmap";
import ProgressBanner from "./banner";
import CommitSlider from "./slider";
import { COMMITS } from "../../data/commits";
import { getStateAtCommit } from "../helpers/functions";

import Counter from "./bfbb-menu/menu-components/counter/counter"
import "./bfbb-menu/menu.css"
import Menu from "./bfbb-menu/menu"

export default class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repoState: getStateAtCommit(COMMITS.length - 1),
      open: false,

      // Placeholder Menu Values
      contributors: [],
      commitCount: 0,
      contributorCount: 0,
      pullRequestCount: 0,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  

  componentDidMount() {

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
          }
          contributors.push(contributor)
        }
        let commits = 0;
        for (let item of data) {
          commits += item.contributions;
        }
        this.setState({
          contributors: contributors,
          commitCount: commits,
          contributorCount: data.length,
        })
      });

    // Load number of active PRs
    fetch("https://api.github.com/repos/bfbbdecomp/bfbb/pulls")
      .then((response) => response.json())
      .then((data) => {
        let length = data.length;
        this.setState({
          pullRequestCount: length,
        })
      });
  }


  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <ProgressBanner repoState={this.state.repoState} />
            </Grid>
            <Grid onClick={this.handleOpen} item xs={2}>
              <Counter type="spatula" count={Math.floor(this.state.repoState.linesPercent)} total="100" />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Timeline />
          </Grid>
          <Grid item xs={12} md={6}>
            <Heatmap />
          </Grid>
          {/*
          <Grid item xs={12}>
            <CommitSlider />
          </Grid>
          */}
        </Grid>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
        >
          <Menu
            contributors={this.state.contributors}
            spatulaCount={Math.floor(this.state.repoState.linesPercent)}
            shinyCount={this.state.repoState.lines}
            sockCount={Math.floor(this.state.repoState.funcsPercent)}
            collectableCount={this.state.repoState.funcsDone}
            collectableTotal={this.state.repoState.funcs}
            commitCount={this.state.commitCount}
            contributorCount={this.state.contributorCount}
            pullRequestCount={this.state.pullRequestCount}
          >
          </Menu>
        </Modal>
      </>
    );
  }
}
