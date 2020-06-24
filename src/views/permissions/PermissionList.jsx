import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core";
import * as types from "../../redux/constants";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import request from "../../request";
import "../../assets/index.css";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const NewsTable = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const permissions = useSelector((store) => store.permission.permissions);
  console.log(permissions);
  useEffect(() => {
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
    <Card style={{ margin: "100px auto", width: "fit-content" }}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {permissions.length > 0 ? (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissions.slice(0, rowsPerPage).map((permission) => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={permission._id}
                      >
                        <TableCell>{permission.code}</TableCell>

                        <TableCell>
                          <span className="permission">{permission.name}</span>
                        </TableCell>
                        <TableCell>{permission.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            )}
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

NewsTable.propTypes = {
  className: PropTypes.string,
  listNews: PropTypes.array.isRequired,
};

export default NewsTable;
