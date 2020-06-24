import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core';
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
  TablePagination
} from '@material-ui/core';

import { getInitials } from '../../../../../helpers';
import displayIcon from "./correct.svg";
import blockIcon from "./block.svg";
import request from "../../../../../request";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  useEffect(()=>{
    if(isLoading) document.body.style.cursor = 'progress';
    else document.body.style.cursor = 'default';
  },[isLoading])

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleChangeStatus = (user) => {
    setIsLoading(true)
    request()
      .patch(`/admin/accounts/changeStatusUser/${user._id}`, { status: !user.status })
      .then((res) => {
        setIsLoading(false)
        const list = [...users]
        const indexUpdated = list.findIndex(item => item._id === user._id)
        const updatedUser = list.find(item => item._id === user._id)
        updatedUser.status = !updatedUser.status
        list[indexUpdated] = updatedUser
        props.updateList(list)
      });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Created Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                users.slice(0, rowsPerPage).map(user =>
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.user && user.user.avatar}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography variant="body1">{user.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell onClick={() => handleChangeStatus(user)}>
                      {user.status ? (
                        <img style={{cursor : isLoading?"progress":"pointer"}}  src={displayIcon} width="20px" height="20px" />
                      ) : (
                        <img style={{cursor : isLoading?"progress":"pointer"}}  src={blockIcon} width="20px" height="20px" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.user && user.user.address}
                    </TableCell>
                    <TableCell>{user.user && user.user.phoneNumber}</TableCell>
                    <TableCell>
                      {moment(user.createdDay).format('DD/MM/YYYY hh:mm:ss')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
