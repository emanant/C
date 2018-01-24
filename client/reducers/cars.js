export default function cars(state = [], action) {
  switch(action.type) {
    // case "TEST_ACTION":
    //   return Object.assign({}, state, {test: action.data});
    case "GOT_CARS":
      return action.data;
    case "FETCH_CARS_FAILED":
      return state;
    default:
      return state;
  } 
}