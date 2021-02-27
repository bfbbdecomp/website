import React from "react";
import Pagination from "./pagination";

export default class FunctionTable extends React.Component {
  state = {
    limit: 50,
    tableData: [],
  };

  componentDidMount() {
    this.generateTableData();
  }

  generateTableData() {
    this.setState({ tableData: [1, 2, "test", Math.random()] });
  }

  generateRow(func) {
    return (
      <tr>
        <td>{func}</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name {this.props.name}</th>
              <th>File</th>
              <th>Size</th>
              <th>Commit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((func) => {
              return this.generateRow(func);
            })}
          </tbody>
        </table>
        <Pagination />
      </div>
    );
  }
}
