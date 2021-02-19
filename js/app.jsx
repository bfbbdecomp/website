import React from "react";
import Header from "./header";

import "../css/app.css";
import "../css/tailwind.css";

export default class App extends React.Component {
  render() {
    const Page = this.props.page;
    return (
      <div id="page" className="container max-w-screen-xl mx-auto">
        <Header />
        <Page />
      </div>
    );
  }
}
