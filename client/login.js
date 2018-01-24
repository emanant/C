import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Actions from './actions/actions';
import {Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import App from "./App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./login.css";

class Login extends Component  {
  constructor (props){
    super(props);
    this.state = {
      email : "",
      password: ""
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange (event) {
    this.setState({
      [event.target.id] : event.target.value
    });
  }
  auth() {

    // return
  }

  handleSubmit (event) {
    // if(auth){
      this.props.dispatch(push('/cars'));
      this.props.dispatch(Actions.testAction());
    // }
    
    // ReactDOM.render(
    //   <MuiThemeProvider>
    //     <App />
    //   </MuiThemeProvider>,document.getElementById("divID")
    // );

  }

  render() {
    return (
      <div className = "Login">
        <div className="form">
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type = "email"
              value = {this.state.email}
              onChange = {this.handleChange.bind(this)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type = "password"
              value = {this.state.password}
              onChange = {this.handleChange.bind(this)}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type = "button"
            disabled={!this.validateForm()}
            onClick={this.handleSubmit.bind(this)}
          >
          Login
          </Button>
          </div>
      </div>
    )
  }
}
export default connect(store => store)(Login);
