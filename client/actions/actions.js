import Request from 'axios';

exports.testAction = () => {
  return ({type: "TEST_ACTION", data: "some data"});  
}

exports.fetchCars = () => dispatch => {
  Request.get('/api/cars')
    .then(response => dispatch({type: "GOT_CARS", data: response.data}))
    .catch(error => dispatch({type: "FETCH_CARS_FAILED", data: error}));
}