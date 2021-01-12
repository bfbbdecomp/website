import React from "react";
import Header from "./header";
import { Container } from "@material-ui/core";

export default class App extends React.Component {
  render() {
    const Page = this.props.page;
    return (
      <Container maxWidth="lg">
        <Header />
        <Page />
      </Container>
    );
  }
}
