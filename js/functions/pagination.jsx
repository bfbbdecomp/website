import React from "react";

const GROUP_LIMIT = 5;
const PADDING = 2;

export default class Pagination extends React.Component {
  renderPageButtons() {
    const info = this.props.info;
    const pageArray = [];

    if (info.currentPage >= GROUP_LIMIT - PADDING) {
      pageArray.push([1]);
      pageArray.push(null);
      // are we in the middle or are we at the end?
      if (info.currentPage <= info.totalPages - GROUP_LIMIT) {
        pageArray.push(
          Array.from(
            { length: GROUP_LIMIT },
            (_, i) => i + info.currentPage - 1
          )
        );
        pageArray.push(null);
        pageArray.push([info.totalPages]);
      }
      // we are at the end
      else {
        pageArray.push(
          Array.from(
            { length: GROUP_LIMIT },
            (_, i) => i + info.totalPages - GROUP_LIMIT + 1
          )
        );
      }
    } else {
      pageArray.push(Array.from({ length: GROUP_LIMIT }, (_, i) => i + 1));
      pageArray.push(null);
      pageArray.push([info.totalPages]);
    }

    console.log(info, pageArray);

    return (
      <ul className="pagination-list">
        {pageArray.map((value) => {
          // null = page separator
          if (!value) {
            return (
              <li key={Math.random()}>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            );
          } else {
            return value.map((pageNumber) => {
              const current =
                pageNumber == info.currentPage + 1 ? "is-current" : "";
              const classes = "pagination-link" + " " + current;
              return (
                <li key={pageNumber}>
                  <a
                    onClick={() => {
                      this.props.callback(pageNumber - 1);
                    }}
                    className={classes}
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            });
          }
        })}
      </ul>
    );
  }

  render() {
    const currentPage = this.props.info.currentPage;
    const totalPages = this.props.info.totalPages;
    return (
      <>
        <nav className="pagination" role="navigation" aria-label="pagination">
          <a
            onClick={() => {
              if (currentPage != 0) {
                this.props.callback(currentPage - 1);
              }
            }}
            className="pagination-previous"
          >
            Previous
          </a>
          <a
            onClick={() => {
              if (currentPage < totalPages - 1) {
                this.props.callback(currentPage + 1);
              }
            }}
            className="pagination-next"
          >
            Next page
          </a>
          {this.renderPageButtons()}
        </nav>
        {/*
        <div>
          {Object.keys(this.props.info).map((key) => {
            return (
              <div key={key}>
                {key}: {this.props.info[key]}
              </div>
            );
          })}
        </div>
        */}
      </>
    );
  }
}
