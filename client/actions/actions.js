import Request from 'axios';

exports.testAction = () => {
  return ({type: "TEST_ACTION", data: "some data"});  
}

exports.fetchCars = () => dispatch => {
  return Request
    .get('/api/cars')
    .then(response => dispatch({type: "GOT_CARS", data: response.data}))
    .catch(error => dispatch({type: "FETCH_CARS_FAILED", data: error}));
}

exports.updateCars = (x) => dispatch => {
  return Request
    .put('/api/updateOne', x)
    .then(response => dispatch({type: "UPDATED_CARS", data: response.data}))
    .catch(error => dispatch({type: "UPDATECAR_FAILED", data: error}));
}

exports.createNewCars = (x) => dispatch => {
  return Request
    .post('/api/addCar', x)
    .then(response => dispatch({type: "CREATED_NEW_CAR", data: response.data}))
    .catch(error => dispatch({type: "CERATE_NEW_CAR_FAILED", data: error}));
}
