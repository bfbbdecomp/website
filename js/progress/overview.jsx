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
        <div>
          <ProgressBanner repoState={this.state.repoState} />
          <Timeline />
        </div>
      </>
    );
  }
}
