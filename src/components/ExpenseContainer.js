import React, { Component } from 'react';

import client from '../client.js'

import SubmitExpense from './SubmitExpense.js'
import ExpenseReport from './ExpenseReport.js'
import ExpenseView from './ExpenseView.js'

class ExpenseContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.state = {
      expenses: [],
      view: "view"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken) {
      var that = this;
      var path;
      if (nextProps.isAdmin) {
        path = '/api/expenses';
      }
      else {
        path = '/api/expenses/' + nextProps.username;
      }
      client({
        method: 'GET',
        path: path + '?token=' + nextProps.authToken
      }).then(function(response) {
        if (response.status.code === 200) {
          that.setState({
            expenses: response.entity.expenses
          });
        }
      });
    }
  }

  handleAddExpense(expense) {
    this.setState({
      expenses: this.state.expenses.concat(expense)
    });
  }

  handleChangeView() {
    this.setState({
      view: this.state.view === 'report' ? 'view' : 'report'
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return null;
    }

    if (this.state.view === "view") {
      return (
        <div>
          <SubmitExpense
            authToken={this.props.authToken}
            onSubmit={this.handleAddExpense}
            username={this.props.username}
          />
          <ExpenseView
            expenses={this.state.expenses}
            isAdmin={this.props.isAdmin}
            handleChangeView={this.handleChangeView}
          />
        </div>
      );
    }
    else {
      return (
        <div>
          <SubmitExpense
            authToken={this.props.authToken}
            onSubmit={this.handleAddExpense}
            username={this.props.username}
          />
          <ExpenseReport
            expenses={this.state.expenses}
            username={this.props.username}
            handleChangeView={this.handleChangeView}
          />
        </div>
      );
    }
  }
}

export default ExpenseContainer;
