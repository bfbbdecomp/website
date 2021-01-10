import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="static" color="transparent" elevation={3}>
        <Toolbar variant="dense">
          {/*
          <Tabs value={0}>
            <Tab value={0} label="Item One" to="/progress" component={Link} />
          </Tabs>
          */}
          <Typography variant="h6">
            <Link component={RouterLink} to="/progress">
              Progress
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link component={RouterLink} to="/faq">
              FAQ
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
