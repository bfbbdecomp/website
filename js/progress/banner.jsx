import React from "react";

export default class ProgressBanner extends React.Component {
  percentDone = () => {
    return this.props.repoState.linesPercent;
  };

  completionDate = () => {
    return "TODO";
  };

  asmPercent = () => {
    return (this.props.repoState.linesDone / this.props.repoState.lines) * 100;
  };

  funcPercent = () => {
    return (this.props.repoState.funcsDone / this.props.repoState.funcs) * 100;
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
            >
              January 69th, 2020
            </span>
            .
          </p>
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
