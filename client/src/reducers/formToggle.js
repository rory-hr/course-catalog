export default (state = false, { type }) => {
  switch (type) {
    case 'ON':
      return true;
    case 'OFF':
      return false;
    default:
      return state;
  }
};
