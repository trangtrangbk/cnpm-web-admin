import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { AdminToolbar, AdminTable } from './components';
import mockData from './data';
import AddAdminModal from "../AdminModal/AddAdminModal"
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/actions/index";
import * as types from "../../../redux/constants";

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
  const dispatch = useDispatch();

  const [users] = useState(mockData);
  const isOpenAddAdminModal = useSelector(store => store.addAdmin);

  return (
    <div className={classes.root}>
        <AddAdminModal
          handleClose={()=>dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
          status={isOpenAddAdminModal}
        />
      <AdminToolbar />
      <div className={classes.content}>
        <AdminTable users={users} />
      </div>
    </div>
  );
};

export default AdminList;
