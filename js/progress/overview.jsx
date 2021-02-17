import React from "react";
import Timeline from "./timeline/timeline";
import ProgressBanner from "./banner";
import { COMMITS } from "../../data/commits";
import { getStateAtCommit } from "../helpers/functions";

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
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <div container spacing={2}>
          <div container spacing={2}>
            <div item xs={11}>
              <ProgressBanner repoState={this.state.repoState} />
            </div>
            <div onClick={this.handleOpen} item xs={1}>
              <div
                type="spatula"
                count={Math.floor(this.state.repoState.linesPercent)}
              />
            </div>
          </div>
          <div item xs={12} md={12}>
            <Timeline />
          </div>
        </div>
        <div
          open={this.state.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      </>
    );
  }
}
