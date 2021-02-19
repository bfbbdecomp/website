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
      <div className="p-4">
        <div className="text-3xl font-bold text-gray-700 pb-2 md:pb-0">
          Battle for Bikini Bottom is{" "}
          <span className="">{this.percentDone()}%</span> decompiled
        </div>
        <div className="text-xl text-gray-600">
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
        </div>
      </div>
    );
  }
}
