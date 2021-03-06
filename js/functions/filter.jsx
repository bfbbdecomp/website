import React from "react";

export default class Filter extends React.Component {
  state = {};

  filterSelect() {
    return (
      <div className="select">
        <select>
          <option>String</option>
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className="my-5">
        <h1 className="title">Search</h1>
        {this.filterSelect()}
      </div>
    );
  }
}
