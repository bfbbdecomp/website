import React from "react";
import Menu from "./bfbb-menu/menu";

export default class Progress extends React.Component {
  render() {
    return (
      <>
        <div>Progress Page!</div>
        <Menu
          spatulaCount={5}
          shinyCount={20274}
          sockCount={2}
          collectableCount={25}
          collectableTotal={121}
          commitCount={174}
          contributorCount={8}
          pullRequestCount={1}
        ></Menu>
      </>
    );
  }
}
