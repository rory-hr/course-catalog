import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import CellActions from './CellActions';
import { toggleFormOn, toggleFormOff } from '../actions';
import Form from './Form';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Cancel from '@material-ui/icons/Cancel';

// STYLES
const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h2`
  width: 100%;
  font: 20px;
  margin-left: 30px;
`;

const AddButton = styled.button`
  width: 80px;
  height: 40px;
  margin-right: 30px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Head = styled.thead`

`;

const HeaderRow = styled.tr`
  line-height: 40px;
`;

const Header = styled.th`
  border-bottom: 1px solid black;
  padding: 3px;
  text-align: ${props => props.align};
`;

const Body = styled.tbody`

`;

const Row = styled.tr`
  line-height: 40px;
`;

const Cell = styled.td`
  border-bottom: 1px solid black;
  padding: 3px;
  min-width: 30px;
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: ${props => props.align};
  justify-content: ${props => props.align};
`;

const Day = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${props => props.scheduled ? '#2A2A2A' : '#FFFFFF'};
  color: ${props => props.scheduled ? '#FFFFFF' : '#2A2A2A'};
  text-align: center;
  align-items: center;
  margin-left: 3px;
  cursor: default;
`;

const DayLabel = styled.h5`
  position: relative;
  bottom: 25px;
`;

// TABLE COMPONENT
export default () => {

  // RETRIEVE COLUMNS AND DATA FROM STORE
  const data = useSelector(state => state.data);
  const columns = useSelector(state => state.columns);
  const formToggle = useSelector(state => state.formToggle);

  // BUTTON HANDLERS
  const dispatch = useDispatch();
  const toggleForm = () => {
    dispatch(formToggle ? toggleFormOff() : toggleFormOn());
  };

  // RENDERING LOGIC
  const days = daysObj => Object.keys(daysObj).map((key, i) => 
    <Day key={i} scheduled={daysObj[key]}>
      <DayLabel>
        {key[0]}
      </DayLabel>
    </Day>);

  const headers = columns => Object.keys(columns).map((key, i) => 
    <Header key={i} align={columns[key].align}>
      {key}
    </Header>);
  
  const actions = ID => 
    <Cell>
      <CellContainer align={'center'}>
        <CellActions ID={ID}/>
      </CellContainer>
    </Cell>;

  const rows = data => data.map((row, i) => 
    <Row key={i}>
      {actions(row._id)}{cells(row)}
    </Row>);

  const cells = row => ['Course', 'Room', 'Professor', 'Email', 'Days'].map((key, i) => 
    <Cell key={i} field={key}>
      <CellContainer align={columns[key].align}>
        {key === 'Days' ? days(row.Days) : row[key]}
      </CellContainer>
    </Cell>);

  const form = formToggle ? <Form /> : null;
  const addRecordButton = <IconButton onClick={toggleForm}>{formToggle ? <Cancel /> : <Add />}</IconButton>;

  // LAYOUT
  return (
    <Container>
      {form}
      <TitleContainer>
        <Title>Course Catalog</Title>
        {addRecordButton}
      </TitleContainer>
      <Table>
        <Head>
          <HeaderRow>
            {headers(columns)}
          </HeaderRow>
        </Head>
        <Body>
          {rows(data)}
        </Body>
      </Table>
    </Container>
  );
};
