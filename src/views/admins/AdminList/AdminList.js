import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { AdminToolbar, AdminTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const AdminList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <AdminToolbar />
      <div className={classes.content}>
        <AdminTable users={users} />
      </div>
    </div>
  );
};

export default AdminList;
