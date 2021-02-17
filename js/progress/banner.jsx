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
      <div>
        <div>
          <div>
            <div>
              Battle for Bikini Bottom is {this.percentDone()}% decompiled
            </div>
            {/* 
              <div color="textSecondary">
                Estimated completion date: {this.completionDate()}.
              </div>
              */}
            {/* 

              <LinearProgress
                variant="buffer"
                value={this.asmPercent()}
                valueBuffer={this.funcPercent()}
              />TODO: Make this have hover tooltips */}
          </div>
        </div>
      </div>
    );
  }
}
