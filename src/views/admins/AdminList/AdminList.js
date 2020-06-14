import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import { AdminToolbar, AdminTable } from './components';
import AddAdminModal from "../AdminModal/AddAdminModal"
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/actions/index";
import * as types from "../../../redux/constants";
import request from "../../../request";

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
  const isOpenAddAdminModal = useSelector(store => store.modal.addAdmin);
  const [listAdmins,setListAdmins] = useState([]);
  const fetchListAdmins = ()=>{
    request().get("/admin/accounts/listAdmin").then(
      res =>{
        console.log(res)
        setListAdmins(res.data.data)
      }
    )
  }
  useEffect(()=>{
    fetchListAdmins();
  },[])
  return (
    <div className={classes.root}>
        <AddAdminModal
          handleClose={()=>dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
          status={isOpenAddAdminModal}
        />
      <AdminToolbar />
      <div className={classes.content}>
        <AdminTable admins={listAdmins} fetchList = {()=>fetchListAdmins()} />
      </div>
    </div>
  );
};

export default AdminList;
