import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  headerLink: {
    marginRight: theme.spacing(2),
  },
}));

export default class Header extends React.Component {
  render() {
    const classes = useStyles();

    return (
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <Typography className={classes.headerLink} variant="h6">
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
