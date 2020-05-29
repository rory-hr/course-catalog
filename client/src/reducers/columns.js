const initialState = {
  Actions: {
    align: 'center'
  },
  Course: {
    align: 'left'
  },
  Room: {
    align: 'center'
  },
  Professor: {
    align: 'left'
  },
  Email: {
    align: 'left'
  },
  Days: {
    align: 'center'
  },
};

export default (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
