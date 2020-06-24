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
  const { className, admins, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const handleChangeStatus = (admin) => {
    request()
      .patch(`/admin/accounts/changeStatusAdmin/${admin._id}`, { status: !admin.status })
      .then((res) => {
        props.fetchList();
      });
  };
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
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.slice(0, rowsPerPage).map((admin) => (
                  <TableRow className={classes.tableRow} hover key={admin._id}>
                    <TableCell
                    style={{cursor : "pointer"}}
                    onClick={() => {
                      dispatch(actions.handleAdmin(types.SET_SELECTED_ADMIN, admin));
                      dispatch(actions.openModal(types.OPEN_MODAL_EDIT_ADMIN));
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
                    <TableCell onClick={() => handleChangeStatus(admin)}>
                      {admin.status ? (
                        <img src={displayIcon} width="20px" height="20px" />
                      ) : (
                        <img src={blockIcon} width="20px" height="20px" />
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(admin.createdDay).format("DD/MM/YYYY hh:mm:ss")}
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
