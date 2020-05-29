import { combineReducers } from 'redux';
import columns from './columns';
import data from './data';
import formToggle from './formToggle';
import serverIP from './serverIP';

export default combineReducers({
  columns,
  data,
  formToggle,
  serverIP,
});
