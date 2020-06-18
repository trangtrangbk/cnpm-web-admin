import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core";
import displayIcon from "./correct.svg";
import blockIcon from "./block.svg";
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
import { getInitials } from "../../../../../helpers";
import { useDispatch } from "react-redux";
import { openModal, handleNews } from "../../../../../redux/actions/index";
import * as types from "../../../../../redux/constants";
import request from "../../../../../request";
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

const NewsTable = (props) => {
  const { className, listNews, ...rest } = props;

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

  const handleChangeStatus = (news) => {
    request()
      .patch(`/admin/news/${news._id}`, { status: !news.status })
      .then((res) => {
        props.fetchList();
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listNews.slice(0, rowsPerPage).map((news) => (
                  <TableRow className={classes.tableRow} hover key={news._id}>
                    <TableCell
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(handleNews(types.SET_SELECTED_NEWS, news));
                        dispatch(openModal(types.OPEN_MODEL_VIEW_NEWS));
                      }}
                    >
                      <img src= {news.picture[0]} width = "200px" height ="auto"/>
                    </TableCell>
                    <TableCell
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(handleNews(types.SET_SELECTED_NEWS, news));
                        dispatch(openModal(types.OPEN_MODEL_VIEW_NEWS));
                      }}
                    >
                      {news.title}
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar className={classes.avatar} src={news.avatarUrl}>
                          {getInitials(news.user.username)}
                        </Avatar>
                        <Typography variant="body1">{news.user.username}</Typography>
                      </div>
                    </TableCell>
                    <TableCell onClick={() => handleChangeStatus(news)}>
                      {news.status ? (
                        <img src={displayIcon} width="20px" height="20px" />
                      ) : (
                        <img src={blockIcon} width="20px" height="20px" />
                      )}
                    </TableCell>

                    <TableCell>{news.address}</TableCell>

                    <TableCell>{news.phone}</TableCell>
                    <TableCell>
                      {moment(news.createDay).format("DD/MM/YYYY hh:mm:ss")}
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
          count={listNews.length}
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

NewsTable.propTypes = {
  className: PropTypes.string,
  listNews: PropTypes.array.isRequired,
};

export default NewsTable;
