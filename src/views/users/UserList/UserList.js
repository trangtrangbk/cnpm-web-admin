import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import * as types from "../../../redux/constants";
import {  UsersTable } from "./components";
import { useDispatch } from "react-redux";
import request from "../../../request";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SearchInput } from '../../../components';

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

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("")
  const fetchListUsers = () => {
    setIsLoading(true);
    request()
      .get("/admin/accounts/listUsers")
      .then((res) => {
        console.log(res);
        setListUsers(res.data);
        setListFilter(res.data)
        setIsLoading(false)
      }).catch(err=>setIsLoading(false))
  };

  useEffect(() => {
    fetchListUsers();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.row} style={{paddingTop : "60px", paddingBottom : "30px"}}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
          value={search}
          onChange = {e =>{
            setSearch(e.target.value)
            const list = [...listUsers]
            if(e.target.value === "") setListFilter(list)
            else setListFilter(list.filter(user =>user.name.includes(e.target.value) || user.email.includes(e.target.value)))
          }}
        />
      </div>
      <div className={classes.content}>
        { !isLoading ? (
          <UsersTable users={listFilter} updateList = {(list)=>setListUsers(list)} />
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
