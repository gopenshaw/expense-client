import React, { Component } from 'react';

import client from '../client.js'

const errorMessageStyle = {
  height: 20,
  color: "red",
};

const successMessageStyle = {
  height: 20,
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      path: '/api/users',
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
        that.setState({successMessage: "User created. Please log in"});
      }
    });
  }

  render() {
    return (
      <div>
        <h3> Create Account </h3>
        <div style={errorMessageStyle} >
          {this.state.errorMessage}
        </div>
        <div style={successMessageStyle} >
          {this.state.successMessage}
      </div>
        <form onSubmit={this.handleSubmit}>
        Username <input name="Username" type="text" onChange={this.handleUnameChange}/> <br/>
        Password <input name="Password" type="password" onChange={this.handlePwdChange}/> <br/>
        <button> Create a new account </button>
        </form>
      </div>
    )
  }
}

export default CreateAccount;
