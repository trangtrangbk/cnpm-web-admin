import React, { Component } from "react";
import { Router } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import Routes from "./Routes";
import history from "./history";
import { Box, Typography, Link } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        F-Room
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default class App extends Component {
  render() {
    return (
      //   <ThemeProvider>
      <>
        <Router history={history}>
          <Routes />
        </Router>

        <Box mt={8}>
          <Copyright />
        </Box>
      </>
      //   </ThemeProvider>
    );
  }
}
