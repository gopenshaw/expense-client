import React, { Component } from 'react';

import client from '../client.js'

const errorMessageStyle = {
  height: 20,
  color: "red",
};

const successMessageStyle = {
  height: 20,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLogin = this.props.onLogin.bind(this);
    this.state = {
      errorMessage: "",
      successMessage: "" };
  }

  handleUnameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePwdChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      errorMessage: "",
      successMessage: ""}
    );
    var that = this;
    client({
      method: 'POST',
      path: '/api/authenticate',
      entity: {
        'name': this.state.username,
        'password': this.state.password
      }
    }).then(function(response) {
      console.log(response.entity);
      if (response.status.code === 422) {
        that.setState({errorMessage: response.entity.message});
      }
      else {
        that.onLogin(true, response.entity.token);
        console.log("login successful");
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return null
    }

    return (
      <div>
        <h3> Login </h3>
        <div style={errorMessageStyle} >
          {this.state.errorMessage}
        </div>
        <div style={successMessageStyle} >
          {this.state.successMessage}
      </div>
        <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUnameChange}/> <br/>
        Password <input type="password" onChange={this.handlePwdChange}/> <br/>
        <button> Login </button>
        </form>
      </div>
    )
  }
}

export default Login;
