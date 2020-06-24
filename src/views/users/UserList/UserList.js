import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import * as types from "../../../redux/constants";
import { UsersToolbar, UsersTable } from "./components";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../request";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const fetchListUsers = () => {
    request()
      .get("/admin/accounts/listUsers")
      .then((res) => {
        console.log(res);
        setListUsers(res.data);
      });
  };
  useEffect(() => {
    fetchListUsers();
  }, []);
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        {listUsers.length > 0 ? (
          <UsersTable users={listUsers} fetchList={() => fetchListUsers()} />
        ) : (
          <div style={{textAlign : "center"}}>
          <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
