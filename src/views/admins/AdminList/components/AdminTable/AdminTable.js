import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@material-ui/core";
import displayIcon from "./correct.svg";
import blockIcon from "./block.svg";
import { getInitials } from "../../../../../helpers";
import { useSelector, useDispatch } from "react-redux";
import request from "../../../../../request";
import * as types from "../../../../../redux/constants";
import actions from "../../../../../redux/actions";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const AdminTable = (props) => {
  const { className, admins,updateList,fetchList,...rest } = props;

  console.log("admin", admins)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const adminInfo = JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    if(isLoading) document.body.style.cursor = 'progress';
    else document.body.style.cursor = 'default';
  },[isLoading])

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangeStatus = (admin) => {
      setIsLoading(true)
      request()
        .patch(`/admin/accounts/changeStatusAdmin/${admin._id}`, { status: !admin.status })
        .then((res) => {
          setIsLoading(false)
          const list = [...admins]
          const indexUpdated = list.findIndex(item => item._id === admin._id)
          const updatedAdmin = list.find(item => item._id === admin._id)
          updatedAdmin.status = !updatedAdmin.status
          list[indexUpdated] = updatedAdmin
          updateList(list)
        });
  }

  const onDeleteAdmin = id =>{
    setIsLoading(true)
    request()
        .delete(`/admin/accounts/deleteAdmin/${id}`)
        .then((res) => {
          setIsLoading(false)
          const list = admins.filter(admin => admin._id !== id)
          console.log(list)
          fetchList()
        }).catch(er => setIsLoading(false))
  }

  const permissions = useSelector((store) => store.permission.permissions);

  const getPermissionName = (code) => {
    const permission =
      permissions.find((permission) => permission.code == code) || [];
    return permission.name;
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created day</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.slice(page*rowsPerPage, (page+1)*rowsPerPage).map((admin) => (
                  <TableRow className={classes.tableRow} hover key={admin._id}>
                    <TableCell
                    style={{cursor : "pointer"}}
                    onClick={() => {
                      if((admin.role.findIndex(e => e===4) ===-1) ){
                        dispatch(actions.handleAdmin(types.SET_SELECTED_ADMIN, admin));
                        dispatch(actions.openModal(types.OPEN_MODAL_EDIT_ADMIN));
                      }
                    }}
                    >
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={admin.avatarUrl}
                        >
                          {getInitials(admin.name)}
                        </Avatar>
                        <Typography variant="body1">{admin.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell style={{ width: "30%" }}>
                      {admin.role.map((r) => (
                        <span className="permission">
                          {getPermissionName(r)}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell onClick={() => adminInfo.id === admin._id?false: handleChangeStatus(admin)}>
                      {admin.status ? (
                        <img style={{cursor : isLoading?"progress":"pointer"}} src={displayIcon} width="20px" height="20px" />
                      ) : (
                        <img style={{cursor : isLoading?"progress":"pointer"}}  src={blockIcon} width="20px" height="20px" />
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(admin.createdDay).format("DD/MM/YYYY hh:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {(admin.role.findIndex(e => e===4) ===-1) &&
                      <DeleteOutlineIcon
                      style={{cursor : "pointer"}}
                      onClick = {()=>{
                        if (window.confirm("Xác nhận xóa tài khoản admin này?")){
                          onDeleteAdmin(admin._id)
                        }
                      }}
                      />}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={admins.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

AdminTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
};

export default AdminTable;
