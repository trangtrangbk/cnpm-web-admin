import React, { useState, useEffect } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { SearchInput } from '../../../components';

import {  AdminTable } from "./components";
import AddAdminModal from "../AdminModal/AddAdminModal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/actions/index";
import * as types from "../../../redux/constants";
import request from "../../../request";
import EditAdminModal from "../AdminModal/EditAdminModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  }
}));

const AdminList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addAdmin, editAdmin } = useSelector((store) => store.modal);
  const [listAdmins, setListAdmins] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  const [listFilter, setListFilter] = useState([]);
  const [search, setSearch] = useState("")

  const fetchListAdmins = () => {
    setIsLoading(true)
    request()
      .get("/admin/accounts/listAdmins")
      .then((res) => {
        console.log(res);
        setListAdmins(res.data);
        setIsLoading(false);
        setListFilter(res.data)
      });
  };
  const permissions = useSelector((store) => store.permission.permissions);

  useEffect(() => {
    fetchListAdmins();
    if (permissions.length <= 0) {
      request()
        .get("/permissions")
        .then((res) => {
          console.log(res);
          dispatch({ type: types.SET_ROLES, payloads: res.data });
        });
    }
  }, []);

  return (
    <div className={classes.root}>
      <AddAdminModal
        fetchList = {()=>fetchListAdmins()}
        roles={permissions}
        handleClose={() => dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
        status={addAdmin}
      />
      <EditAdminModal
        roles={permissions}
        handleClose={() => dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
        status={editAdmin}
      />
      <div className={classes.row} style={{paddingTop : "60px", paddingBottom : "30px"}}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search admin"
          value={search}
          onChange = {e =>{
            setSearch(e.target.value)
            const list = [...listAdmins]
            if(e.target.value === "") setListFilter(list)
            else setListFilter(list.filter(admin =>admin.name.includes(e.target.value) || admin.email.includes(e.target.value) ))
          }}
        />
      </div>
      <div className={classes.content}>
        {!isLoading? (
          <AdminTable
            admins={listFilter}
            updateList = {(list) => setListAdmins(list)}
            permissions={permissions}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
