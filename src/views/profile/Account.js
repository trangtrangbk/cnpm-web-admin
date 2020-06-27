import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import {  AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(12)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
