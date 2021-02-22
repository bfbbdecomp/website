import React from "react";
import Header from "./header";

export default class App extends React.Component {
  render() {
    const Page = this.props.page;
    return (
      <div id="page" className="container">
        <Header />
        <Page />
      </div>
    );
  }
}
