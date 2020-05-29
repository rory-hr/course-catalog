import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import $ from 'jquery';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { deleteRecord } from '../actions';

export default ({ ID }) => {
  const serverIP = useSelector(state => state.serverIP);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRecord(ID));
    $.ajax({ url: `${serverIP}/api/courses/${ID}`, method: 'DELETE'});
  };

  return (
    <div>
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </div>
  );
};
