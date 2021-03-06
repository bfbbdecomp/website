import React from "react";
import { Link } from "react-router-dom";
import { getTimeEstimate } from "../helpers/time";

export default class ProgressBanner extends React.Component {
  state = {
    time: getTimeEstimate(90),
    showEstimate: false,
  };

  componentDidMount() {
    console.log(this.state.time);
  }

  percentDone = () => {
    return this.props.repoState.linesPercent;
  };

  asmPercent = () => {
    return (this.props.repoState.linesDone / this.props.repoState.lines) * 100;
  };

  funcPercent = () => {
    return (this.props.repoState.funcsDone / this.props.repoState.funcs) * 100;
  };

  estimateDiv = () => {
    return (
      <div className="notification is-warning">
        <button
          onClick={() => {
            this.setState({ showEstimate: false });
          }}
          className="delete"
        ></button>
        <p>
          At a rate of {this.state.time.difference.toLocaleString()} lines of
          assembly decompiled every{" "}
          {this.state.time.daysPassed.toLocaleString()} days, it will take{" "}
          {this.state.time.timeBetweenString} to decompile the remaining{" "}
          {this.state.time.remaining.toLocaleString()} lines.
        </p>
        <Link to="faq">Learn how you can help to improve this time.</Link>
        <p>
          <i>
            This estimate is calculated automatically based on the closest
            commit 90 days ago.
          </i>
        </p>
      </div>
    );
  };

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <p className="title">
            Battle for Bikini Bottom is{" "}
            <span className="">{this.percentDone()}%</span> decompiled
          </p>
          <p className="subtitle">
            Estimated completion date:{" "}
            <span
              style={{
                cursor: "help",
                borderBottom: "dashed 1px",
                borderColor: "#999999",
              }}
              onClick={() => {
                this.setState({ showEstimate: true });
              }}
              title="Click to learn how this was calculated"
            >
              {this.state.time.doneDateString}
            </span>
          </p>
          {this.state.showEstimate ? this.estimateDiv() : null}
          <progress
            className="progress is-success"
            value={this.percentDone()}
            max="100"
          ></progress>
        </div>
      </section>
    );
  }
}
