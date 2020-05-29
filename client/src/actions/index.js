export const toggleFormOn = () => ({ type: 'ON' });
export const toggleFormOff = () => ({ type: 'OFF' });
export const addRecord = (payload) => ({ type: 'ADD_RECORD', payload });
export const addRecords = (payload) => ({ type: 'ADD_RECORDS', payload });
export const deleteRecord = payload => ({ type: 'DELETE_RECORD', payload });