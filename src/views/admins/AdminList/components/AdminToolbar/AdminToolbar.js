import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { SearchInput } from '../../../../../components';
import { openModal } from "../../../../../redux/actions/index";
import * as types from "../../../../../redux/constants";

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

const AdminToolbar = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick = {()=>dispatch(openModal(types.OPEN_MODAL_ADD_ADMIN))}
        >
          Add
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search admin"
        />
      </div>
    </div>
  );
};

AdminToolbar.propTypes = {
  className: PropTypes.string
};

export default AdminToolbar;
