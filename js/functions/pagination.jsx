import React from "react";

const GROUP_LIMIT = 5;

const range = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, i) => i + min);

export default class Pagination extends React.Component {
  getButtonList() {
    const { totalPages, currentPage } = this.props.info;
    // console.log(totalPages, currentPage);

    const pageArray = [];

    if (totalPages <= 0) {
      return pageArray;
    }

    if (totalPages <= GROUP_LIMIT) {
      pageArray.push(range(1, totalPages));
      return pageArray;
    }

    if (currentPage < GROUP_LIMIT - 1) {
      pageArray.push(range(1, GROUP_LIMIT + 1));
      pageArray.push(null);
      pageArray.push([totalPages]);
      return pageArray;
    }

    if (currentPage > totalPages - GROUP_LIMIT) {
      pageArray.push([1], null);
      pageArray.push(range(totalPages - GROUP_LIMIT, totalPages));
      return pageArray;
    }

    const GROUP_HALF = Math.floor(GROUP_LIMIT / 2);
    pageArray.push([1], null);
    pageArray.push(
      range(currentPage - GROUP_HALF + 1, currentPage + GROUP_HALF + 1)
    );
    pageArray.push(null, [totalPages]);

    return pageArray;
  }

  renderPageButtons() {
    const info = this.props.info;
    const pageArray = this.getButtonList();

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
            disabled={currentPage == 0 ? true : false}
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
            disabled={currentPage + 1 == totalPages ? true : false}
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
