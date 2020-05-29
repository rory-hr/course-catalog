import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import $ from 'jquery';
import { toggleFormOff, addRecord } from '../actions';

const Background = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const FormContainer = styled.div`
  z-index: 3;
  position:fixed;
  background: #F8F8F8;
  border-radius: 5px;
  padding: 15px 30px 20px 30px;
  width: 40%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const TextInputs = styled.div`
  display: flex; 
  flex-direction: row;
  width: 100%;
`;

const InputColumn = styled.div`
  flex: 1;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.h3`
  font: 13px;
  margin-bottom: 5px;
`;

const CourseInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px 5px 5px 10px;
  border: .3px solid #ADADA5;
  outline-color: ${props => props.isValid ? '#ADADA5' : '#E63946' };
`;
const RoomInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px 5px 5px 10px;
  border: .3px solid #ADADA5;
`;
const ProfessorInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px 5px 5px 10px;
  border: .3px solid #ADADA5;
`;
const EmailInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px 5px 5px 10px;
  border: .3px solid #ADADA5;
  outline-color: ${props => props.isValid ? '#ADADA5' : '#E63946' };
`;

const DayInputs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DaysRow = styled.div`
  display: flex;
  height: 40px;
  max-width: 235px;
  flex-direction: row;
  justify-content: space-between;
`;

const Day = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: ${props => props.scheduled ?   '#FFFFFF' : '#2A2A2A'};
  background: ${props => props.scheduled ?   '#2A2A2A' : '#FFFFFF'};
  text-align: center;
  align-items: center;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    box-shadow: 0 0 3px #888888;
  }
  :active {
    opacity: 0.3;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  background: #58864E;
  top: 30px;
  left: 37px;
  width: 130px;
  height: 40px;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  opacity: ${props => props.disabled ? 1 : 0.3};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const DayLabel = styled.h5`
  position: relative;
  bottom: 14px;
`;

export default () => {
  // RENDERING LOGIC
  const days = (daysObj) => Object.keys(daysObj).map((key, i) => <Day key={i} onClick={() => {schedule(key)}} scheduled={daysObj[key]}><DayLabel>{key[0]}</DayLabel></Day>);

  // LOCAL FORM STATE and CONTROL
  const [ buttonIsActive, setButtonIsActive ] = useState(false);
  const [ Course, setCourse ] = useState('');
  const [ courseIsValid, setCourseIsValid ] = useState('initial');
  const [ Room, setRoom ] = useState('');
  const [ roomIsValid, setRoomIsValid ] = useState(true);
  const [ Professor, setProfessor ] = useState('');
  const [ professorIsValid, setProfessorIsValid ] = useState(true);
  const [ Email, setEmail ] = useState('');
  const [ emailIsValid, setEmailIsValid ] = useState(true);
  const [ Days, setDays ] = useState ({ Su: false, Mo: false, Tu: false, We: false, Th: false, Fr: false, Sa: false });

  // BUTTON/CHANGE HANDLERS
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleFormOff());
  };
  const schedule = (key) => {
    setDays({ ...Days, [key]: !Days[key] });
  };
  const checkButton = () => {
    setButtonIsActive(courseIsValid && roomIsValid && professorIsValid && emailIsValid);
  };
  const courseChange = e => {
    const { value } = e.target;
    setCourse(value);
    setCourseIsValid(/^[a-zA-Z0-9 ]*$/.test(value) && value !== '');
  };
  const emailChange = e => {
    const { value } = e.target;
    setEmail(value);
    setEmailIsValid(/^\w+@psu\.edu$/.test(value) || value === '');
  };
  

  // API CALLS
  const serverIP = useSelector(state => state.serverIP);
  const addCourse = e => {
    e.preventDefault();
    const newRecord = JSON.stringify({
      Course,
      Room: Room || 'TBD',
      Professor: Professor || 'TBD',
      Email: Email || 'TBD',
      Days
    });
    $.ajax({
      url: `${serverIP}/api/courses`,
      method: 'POST',
      contentType: 'application/json',
      data: newRecord,
      complete: ({responseJSON}) => {
        const editedResponse = { ...responseJSON, ID: responseJSON._id };
        dispatch(addRecord(editedResponse));
      }
    });
    dispatch(toggleFormOff());
  };

  const stopPropagation = e => { e.stopPropagation() };

  // CHECK BUTTON STATUS AFTER FORM STATE CHANGES
  useEffect(() => {
    checkButton();
  }, [courseIsValid, roomIsValid, professorIsValid, emailIsValid]);

  // LAYOUT
  return (
    <Background onClick={closeModal}>
      <FormContainer onClick={stopPropagation}>
        <TextInputs>
          <InputColumn>
            <FormLabel>Course Name</FormLabel>
            <CourseInput isValid={courseIsValid} placeholder='ex. Applied Calculus' onChange={courseChange} />
            <FormLabel>Room Number</FormLabel>
            <RoomInput placeholder='ex. 123' onChange={e => { setRoom(e.target.value) }} />
          </InputColumn>
          <InputColumn>
            <FormLabel>Professor</FormLabel>
            <ProfessorInput placeholder='ex. MacArthur' onChange={e => { setProfessor(e.target.value) }} />
            <FormLabel>Professor Email</FormLabel>
            <EmailInput isValid={emailIsValid} placeholder='ex. macarthur@psu.edu' onChange={emailChange} />
          </InputColumn>
        </TextInputs>
        <DayInputs>
          <InputColumn>
            <FormLabel>Days</FormLabel>
            <DaysRow>
              {days(Days)}
            </DaysRow>
          </InputColumn>
          <InputColumn>
            <SubmitButton disabled={buttonIsActive} onClick={addCourse}>ADD COURSE</SubmitButton>
          </InputColumn>
        </DayInputs>
      </FormContainer>
    </Background>
  );
};