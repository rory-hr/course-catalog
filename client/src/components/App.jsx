import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import $ from 'jquery';
import Table from './Table';
import NavBar from './NavBar';
import { addRecords } from '../actions';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    background: #FFFFFC;
  }
  /* div {
    display: flex;
    flex-direction: column;
    flex: 1;
  } */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Main = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const serverIP = useSelector(state => state.serverIP);

  const dispatch = useDispatch();
  useMemo(() => {
    $.get(`${serverIP}/api/courses`, (results) => {
      dispatch(addRecords(results));
    });
  });

  return (
    <Container>
      <GlobalStyle />
      <NavBar />
      <Main>
        <Spacer />
        <Table />
        <Spacer />
      </Main>
    </Container>
  );
};
