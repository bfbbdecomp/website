import React from "react";
import Overview from "./overview";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  /*
    TODO: make this tab switch not re-render components,
    but rather hide/display them via CSS to avoid
    recalculating HTML every time it's changed.
  */
  renderTab = () => {
    switch (this.state.tab) {
      case 0:
        return <Overview />;
      default:
        return <div>TODO</div>;
    }
  };

  componentDidMount() {}

  handleChange = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    return (
      <div container spacing={2}>
        <div item xs={12}>
          <div>
            <div
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              value={this.state.tab}
            >
              <div tabIndex={0} label="Overview" />
              <div tabIndex={2} disabled label="Files" />
              <div tabIndex={1} disabled label="Functions" />
              <div tabIndex={3} disabled label="Contributors" />
            </div>
          </div>
        </div>
        <div item xs={12}>
          {this.renderTab()}
        </div>
      </div>
    );
  }
}
