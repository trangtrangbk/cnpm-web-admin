import React, { useState } from 'react';
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

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleChangeStatus = (user) => {
    request()
      .patch(`/admin/accounts/${user._id}`, { status: !user.status })
      .then((res) => {
        props.fetchList();
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
                  <TableCell>Birthday</TableCell>
                  <TableCell>Created Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        >
                          {getInitials(user.username)}
                        </Avatar>
                        <Typography variant="body1">{user.username}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell onClick={() => handleChangeStatus(user)}>
                      {user.status ? (
                        <img src={displayIcon} width="20px" height="20px" />
                      ) : (
                        <img src={blockIcon} width="20px" height="20px" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.address}
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {moment(user.birthday).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(user.createdDay).format('DD/MM/YYYY hh:mm:ss')}
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
