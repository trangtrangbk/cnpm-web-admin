import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {openModal} from "../../../../../redux/actions/index";
import { SearchInput } from '../../../../../components';
import * as types from "../../../../../redux/constants";
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop : theme.spacing(6)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const NewsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

NewsToolbar.propTypes = {
  className: PropTypes.string
};

export default NewsToolbar;
