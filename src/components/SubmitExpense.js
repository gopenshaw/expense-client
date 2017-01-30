import React, { Component } from 'react';

import client from '../client.js'

const errorMessageStyle = {
  height: 20,
  color: "red",
};

const successMessageStyle = {
  height: 20,
};

const submitExpenseStyle = {
  marginBottom: 15
}

class SubmitExpense extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.props.onSubmit.bind(this);
    this.state = {
      errorMessage: "",
      successMessage: "" };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      errorMessage: "",
      successMessage: ""
    });
    var that = this;
    var postEntity = {
      'token': this.props.authToken,
      'date': this.state.date,
      'cost': this.state.cost,
      'description': this.state.description
    }
    console.log(postEntity)
    client({
      method: 'POST',
      path: '/api/expenses',
      entity: postEntity
    }).then(function(response) {
      console.log(response.entity);
      if (response.status.code === 200) {
        that.setState({successMessage: "expense added"});
        that.onSubmit(response.entity);
      }
      else {
        that.setState({errorMessage: response.entity.message});
      }
    });
  }

  render() {
    return (
      <div style={submitExpenseStyle}>
        <h3> Submit Expense </h3>
        <div style={errorMessageStyle} >
          {this.state.errorMessage}
        </div>
        <div style={successMessageStyle} >
          {this.state.successMessage}
      </div>
        <form onSubmit={this.handleSubmit}>
        Date
        <input
          type="date"
          name="date"
          onChange={this.handleChange}
        /> <br/>
        Cost
        <input
          type="number"
          name="cost"
          min="0"
          step="any"
          onChange={this.handleChange}
        /> <br/>
        Description
        <input
          type="text"
          name="description"
          onChange={this.handleChange}
        /> <br/>
        <button> Submit Expense </button>
        </form>
      </div>
    )
  }
}

export default SubmitExpense;
