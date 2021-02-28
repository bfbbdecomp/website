import React from "react";
import { FUNCTIONS } from "../../data/functions";
import { COMMITS } from "../../data/commits";
import { FILES } from "../../data/files";
import Pagination from "./pagination";

const baseURL = "https://github.com/bfbbdecomp/bfbb/";

export default class FunctionTable extends React.Component {
  state = {
    limit: 50,
    tableData: [],
  };

  componentDidMount() {
    this.generateTableData();
  }

  generateTableData() {
    const slice = Object.keys(FUNCTIONS)
      .slice(0, this.state.limit)
      .map((addr) => {
        const obj = FUNCTIONS[addr];
        obj["address"] = addr;
        return obj;
      });
    console.log(slice);

    this.setState({ tableData: slice });
  }

  renderCommitCell(commitID) {
    if (commitID) {
      const hash = COMMITS[commitID].hash;
      const substr = hash.substr(0, 6);
      const url = baseURL + "commit/" + hash;
      const time = COMMITS[commitID].time;
      const date = new Date(time * 1000);
      return (
        <a title={date} rel="noreferrer" target="_blank" href={url}>
          {substr}
        </a>
      );
    }
    return commitID;
  }

  renderFileCell(fileID, commitID) {
    let path = FILES[fileID].path;
    let url = "";
    if (commitID) {
      url = baseURL + "blob/master/src/" + path;
    } else {
      path = path.replace(".cpp", ".s");
      url = baseURL + "blob/master/asm/" + path;
    }
    return (
      <a target="_blank" rel="noreferrer" href={url}>
        {path}
      </a>
    );
  }

  generateRow(func) {
    console.log(func);
    return (
      <tr
        className={func.commit ? "has-background-success-light" : ""}
        key={func.address}
      >
        <td>{this.renderFileCell(func.file, func.commit)}</td>
        <td>{func.lines}</td>
        <td>{func.name}</td>
        <td>{this.renderCommitCell(func.commit)}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
              <th>Name</th>
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
