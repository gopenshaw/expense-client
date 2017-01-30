import React, { Component } from 'react';

import client from '../client.js'

import SubmitExpense from './SubmitExpense.js'
import ExpenseReport from './ExpenseReport.js'

class ExpenseContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.state = {
      expenses: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken) {
      var that = this;
      var path = '/api/expenses/' + nextProps.username
      client({
        method: 'GET',
        path: path + '?token=' + nextProps.authToken
      }).then(function(response) {
        if (response.status.code === 200) {
          that.setState({expenses: response.entity.expenses});
        }
      });
    }
  }

  handleAddExpense(expense) {
    this.setState({
      expenses: this.state.expenses.concat(expense)
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return null;
    }

    return (
      <div>
        <SubmitExpense
          authToken={this.props.authToken}
          onSubmit={this.handleAddExpense}
          username={this.props.username}
        />
        <ExpenseReport
          authToken={this.props.authToken}
          expenses={this.state.expenses}
          username={this.props.username}
        />
      </div>
    );
  }
}

export default ExpenseContainer;
