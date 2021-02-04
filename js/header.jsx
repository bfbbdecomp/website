import React from "react";
import { AppBar, Toolbar, Typography, Link, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import GitHubIcon from '@material-ui/icons/GitHub';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TimelineIcon from '@material-ui/icons/Timeline';
import HelpIcon from '@material-ui/icons/Help';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: window.location.pathname.slice(1) };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue}, () => {
      if (this.state.value === "github") {
        window.location.href = "https://www.github.com/bfbbdecomp/"
      }
      else if (this.state.value === "discord") {
        window.location.href = "https://discord.gg/zEr6u3mRWe"
      }
    });
  };

  render() {
    console.log(this.state.value)
    return (
      <AppBar position="static" color="transparent" elevation={3}>
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
          className="bottom-navigation"
        >
          <BottomNavigationAction component={RouterLink} to="/progress" value="progress" label="Progress" icon={<TimelineIcon />} />
          <BottomNavigationAction component={RouterLink} to="/faq" value="faq" label="FAQ" icon={<HelpIcon />} />
          <BottomNavigationAction value="github" label="GitHub" icon={<GitHubIcon />} />
          <BottomNavigationAction value="discord" label="Discord" icon={<SportsEsportsIcon />} />
        </BottomNavigation>
      </AppBar>
    );
  }
}
