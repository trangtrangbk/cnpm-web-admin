import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { NewsTable, NewsToolbar } from './components';
import { useDispatch, useSelector } from 'react-redux';
import request from "../../../request";
import ViewNewsModal from "../NewsModal/ViewNewsModal";
import {closeModal} from "../../../redux/actions/index";
import * as types from "../../../redux/constants";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const NewsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [listNews,setListNews] = useState([]);
  const fetchListNews = ()=>{
    request().get("/admin/news").then(
      res =>{
        console.log(res)
        setListNews(res.data)
      }
    )
  }
  useEffect(()=>{
    fetchListNews();
  },[])
  const isOpenViewNewsModal = useSelector(store => store.modal.viewNews);
  const news = useSelector(store =>store.news.selectedNews)
  return (
    <div className={classes.root}>
      <ViewNewsModal
        handleClose={()=>dispatch(closeModal(types.CLOSE_MODEL_VIEW_NEWS))}
        status={isOpenViewNewsModal}
        news = {news}
      />
      <NewsToolbar />
      <div className={classes.content}>
        <NewsTable listNews={listNews} fetchList = {()=>fetchListNews()}/>
      </div>
    </div>
  );
};

export default NewsList;
