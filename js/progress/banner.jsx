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
      <div className="md:p-4">
        <div className="text-3xl font-semibold text-gray-700 pb-2 md:pb-0">
          Battle for Bikini Bottom is{" "}
          <span className="">{this.percentDone()}%</span> decompiled
        </div>
        <div className="text-xl text-gray-500">
          Estimated completion Date:{" "}
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
        <div className="my-4">
          <div className="overflow-hidden h-3 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: this.props.repoState.linesPercent + "%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
            <div
              style={{
                width:
                  this.props.repoState.funcsPercent -
                  this.props.repoState.linesPercent +
                  "%",
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-200"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
