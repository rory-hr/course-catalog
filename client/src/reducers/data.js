const initialState = [
  {
    ID: 1,
    _id: 1,
    Course: 'Math 101',
    Room: 234,
    Professor: 'Smith',
    Email: 'smith@psu.edu',
    Days: {
      Su: false,
      Mo: true,
      Tu: false,
      We: true,
      Th: false,
      Fr: true,
      Sa: false,
    },
  },
  {
    ID: 2,
    _id: 2,
    Course: 'Chemistry 101',
    Room: 782,
    Professor: 'Rashid',
    Email: 'rashid@psu.edu',
    Days: {
      Su: false,
      Mo: false,
      Tu: true,
      We: false,
      Th: true,
      Fr: false,
      Sa: false,
    },
  },
];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_RECORDS':
      return [ ...state, ...payload];
    case 'ADD_RECORD':
      return [ ...state, payload];
    case 'DELETE_RECORD':
      return state.filter(record => record._id !== payload);
    default:
      return state;
  }
};