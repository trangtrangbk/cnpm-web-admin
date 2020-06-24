import React, { useState, useEffect } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";

import { AdminToolbar, AdminTable } from "./components";
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
}));

const AdminList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addAdmin, editAdmin } = useSelector((store) => store.modal);
  const [listAdmins, setListAdmins] = useState([]);
  const fetchListAdmins = () => {
    request()
      .get("/admin/accounts/listAdmins")
      .then((res) => {
        console.log(res);
        setListAdmins(res.data);
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
        roles={permissions}
        handleClose={() => dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
        status={addAdmin}
      />
      <EditAdminModal
        roles={permissions}
        handleClose={() => dispatch(closeModal(types.CLOSE_MODAL_ADD_ADMIN))}
        status={editAdmin}
      />
      <AdminToolbar />
      <div className={classes.content}>
        {listAdmins.length >0 ? (
          <AdminTable
            admins={listAdmins}
            fetchList={() => fetchListAdmins()}
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
