import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import * as types from "../../../redux/constants";
import { useDispatch, useSelector } from 'react-redux';
import request from "../../../request";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PermissionList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [permissons,setPermissons] = useState([]);
  const fetchPermissons = ()=>{
    request().get("/permisson").then(
      res =>{
        console.log(res)
        setPermissons(res.data)
      }
    )
  }
  useEffect(()=>{
    fetchPermissons();
  },[])
  return (
    <div className={classes.root}>
      {permissons.map(permisson=>(
          <p>{permisson.name}</p>
      ))}
    </div>
  );
};

export default PermissionList;
