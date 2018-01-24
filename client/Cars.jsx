import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Request from 'axios';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import EditIcon from 'material-ui/svg-icons/editor/border-color.js';
import DeleteIcon from 'material-ui/svg-icons/action/delete.js';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Actions from './actions/actions';
import { connect } from 'react-redux';

const styles = {
  title: {
    cursor: "pointer"
  }
}
var qs = require('qs');

function onTitleClick() {
  alert("add link to Home");
}

class Cars extends Component {
  constructor(props){
    super(props);
    this.state={
      car:[],
      editCar: false,
      newCar: null,
      logged: true
    }
  }
  handleLoginState(event,Logged){
    this.setState({logged: Logged});
  }
  loginClicked(event){
    this.setState({logged:false});
    this.props.history.push('/');
  }
  componentDidMount() {
    this.getAllCars();
  }
  // componentWillReceiveProps() {
  //   this.getAllCars();
  //   this.render();
  // }
  editClickListner(id){
    // const c = this.state.car.find( x => x.id == id);
    const c = this.props.P_cars.find( x => x.id == id);
    console.log(id);
    this.setState({editCar : c})
  }
  getAllCars() {
    // Request.get('/api/cars')
    // .then(response => this.setState({car: response.data}))
    // .catch(error => console.log('Failed to load cars'));
    // console.log(this.state.car);
    
    // this.setState({car = this.props.dispatch(Actions.fetchCars())});
    // console.log(this.state.car);
    this.props.dispatch(Actions.fetchCars());
  }
  addNewElement(field,event,x){       //...//
    this.setState({newCar: Object.assign({}, this.state.newCar, {[field]: event.target.value})})
    // console.log(event.target.value,"sss",field,"sss",x);
  }
  editElement(field,event,x){
    this.setState({editCar: Object.assign({}, this.state.editCar, {[field]: event.target.value})})
    console.log(field," : ",event.target.value);
  }
  createNewCar(event){
    // Request
    // .post('/api/addCar', this.state.newCar)
    // .then(response => {
    //   console.log('added new car');
    //   this.getAllCars();
    //   document.getElementById("nameNewCarTextField").value=null;
    //   document.getElementById("valueNewCarTextField").value=null
    // })
    // .catch(error => console.log('Failed to add car'));
    this.props.dispatch(Actions.createNewCars(this.state.newCar))
    .then(() => this.setState({newCar: null}))
  }
  updateCar(field,event,x) {
    // this.setState({editCar: Object.assign({}, this.state.editCar, {[field]: x})})
    // console.log("car to update : " + x)
    // Request
    // .put('/api/updateOne', this.state.editCar)
    // .then(response => {console.log('update success !');this.getAllCars()})
    // .catch(error => console.log('Failed to update Database'));
    this.props.dispatch(Actions.updateCars(this.state.editCar))
    .then(() => this.setState({editCar: null}))
  }
  deleteClickListner(id) {
    console.log("ID : ",id)
    Request.delete('/api/remove/'+id)
    // Request.delete('/api/remove',id)             //axios.delete  ==> axios#delete(url[, config]) => no data (id here)
    .then(response => {console.log('car deleted');this.getAllCars()})  
    .catch(error => console.log('Failed to delete car'));
  }

  render() {
    return (
    <div>
      <AppBar
        title = { <span style={styles.title}> Cars&Co.</span> }
        onTitleClick={onTitleClick}

        iconElementRight={this.state.logged?
          <FlatButton
            label="Sign out"
            onClick={this.handleLoginState.bind(this,false)}
          />
        :
          <FlatButton
            label="Signin"
            onClick={this.loginClicked.bind(this)}
          />
        }

      />
      <div className = "row col-md-12">
        <div className = "col-md-6">
          {this.props.P_cars.map((m, index) => {
            return (
                <List key={m.id}>
                  {this.state.editCar && m.id === this.state.editCar.id ?
                  <div>
                    <TextField
                      hintText = "Name"
                      value={this.state.editCar.name}
                      onChange={this.editElement.bind(this,"name")}
                    />
                    <TextField
                      hintText = "Type"
                      value={this.state.editCar.type}
                      onChange={this.editElement.bind(this,"type")}
                    />
                    <FlatButton label="Update"
                      onClick={this.updateCar.bind(this,"Id",m.id)}
                    />
                  </div>
                  :
                  <ListItem
                    primaryText = {m.name}
                    secondaryText = {m.type}
                    leftAvatar={<Avatar src={require("./carIcon.png")}/>}
                    rightIcon={
                      <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                        anchorOrigin={{horizontal:'right', vertical:'bottom'}}
                        targetOrigin={{horizontal:'right', vertical:'bottom'}}
                      >
                        <MenuItem primaryText="Edit" 
                          onClick={() => this.editClickListner(m.id)}
                        />
                        <MenuItem primaryText="Remove" 
                          onClick={() => this.deleteClickListner(m.id)}
                        />
                      </IconMenu>
                    }
                  />
                  }
                </List>
            )
          })}
        </div>
        <div className = "col-md-4">
          <TextField
            id = "nameNewCarTextField"
            hintText = "Name"
            onChange={this.addNewElement.bind(this,"Name")}
          />
          <TextField
            id="valueNewCarTextField"
            hintText = "Type"
            onChange={this.addNewElement.bind(this,"Type")}
          />
          <FlatButton label="Add" fullWidth={true}
            onClick={this.createNewCar.bind(this)}
          />
        </div>
      </div>
    </div>

    )
  }
}
export default connect(store => {
  return {P_cars: store.cars}
})(Cars);
