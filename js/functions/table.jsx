import React from "react";
import { FUNCTIONS } from "../../data/functions";
import { COMMITS } from "../../data/commits";
import { FILES } from "../../data/files";
import Pagination from "./pagination";

const baseURL = "https://github.com/bfbbdecomp/bfbb/";

/*
  TODO ideas:
  include references/importance. # of times this function is referenced
*/

export default class FunctionTable extends React.Component {
  state = {
    limit: 100,
    tableData: [],

    pager: {
      totalPages: 0,
      currentPage: 0,
    },
  };

  componentDidMount() {
    this.generateTableData();
  }

  pageChangeCallback(newPageNumber) {
    const pager = this.state.pager;
    pager.currentPage = newPageNumber;
    this.setState({ pager });
    // console.log(this.state);
  }

  generateTableData() {
    const slice = Object.keys(FUNCTIONS)
      //.slice(0, this.state.limit * 2)
      .map((addr) => {
        const obj = FUNCTIONS[addr];
        obj["address"] = addr;
        return obj;
      });
    // console.log(slice);

    this.setState({ tableData: slice }, () => {
      this.updatePageInfo();
    });
  }

  updatePageInfo() {
    /*
    const pager = {
      totalPages: this.state.pager.totalPages,
      currentPage: ,
    };*/

    const oldTotalPages = this.state.pager.totalPages;
    const newTotalPages = Math.ceil(
      this.state.tableData.length / this.state.limit
    );
    const oldCurrentPage = this.state.pager.currentPage;
    //console.log(this.state.tableData);
    const pager = {
      totalPages: newTotalPages,
      currentPage: oldTotalPages == newTotalPages ? oldCurrentPage : 0,
      //currentPage: 0,
    };

    this.setState({ pager });
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

  renderSummary() {
    const total = this.state.tableData.length;
    const limit = this.state.limit;
    const page = this.state.pager.currentPage;
    const lower = limit * page + 1;
    let upper = limit * page + limit;
    if (upper > total) {
      upper = total;
    }
    return (
      <div className="my-2 is-size-7">
        Displaying {lower}-{upper} of {total}
      </div>
    );
  }

  generateRow(func) {
    //console.log(func);
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
        {this.renderSummary()}
        <Pagination
          callback={(pageID) => {
            this.pageChangeCallback(pageID);
          }}
          info={this.state.pager}
        />
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>File</th>
              <th>Lines</th>
              <th>Name</th>
              <th>Commit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData
              .slice(
                this.state.pager.currentPage * this.state.limit,
                this.state.pager.currentPage * this.state.limit +
                  this.state.limit
              )
              .map((func) => {
                return this.generateRow(func);
              })}
          </tbody>
        </table>
        {this.renderSummary()}
        <Pagination
          callback={(pageID) => {
            this.pageChangeCallback(pageID);
          }}
          info={this.state.pager}
        />
      </div>
    );
  }
}
