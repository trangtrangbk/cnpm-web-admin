import { combineReducers } from 'redux'
import modal from './modal'
import news from './news'
import permission from "./permission"
import admin from './admin'
export default combineReducers({
  modal,
  news,
  permission,
  admin
})