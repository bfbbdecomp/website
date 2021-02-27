import React from "react";
import Header from "./header";

import "@fortawesome/fontawesome-free/css/all.css";

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
