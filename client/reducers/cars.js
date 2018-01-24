export default function cars(state = [], action) {
  switch(action.type) {
    // case "TEST_ACTION":
    //   return Object.assign({}, state, {test: action.data});
    case "GOT_CARS":
      return action.data;
    case "FETCH_CARS_FAILED":
      return state;
    case "UPDATED_CARS":
      return action.data;
    case "UPDATECAR_FAILED":
      return null;
    case "CREATED_NEW_CAR":
      return action.data;
    case "CERATE_NEW_CAR_FAILED":
      return state;
    default:
      return state;
  } 
}