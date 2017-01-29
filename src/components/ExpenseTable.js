import React, { Component } from 'react';

import client from '../client.js'

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto"
};

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken) {
      var that = this;
      client({
        method: 'GET',
        path: '/api/expenses?token=' + nextProps.authToken
      }).then(function(response) {
        if (response.status.code === 200) {
          that.setState({expenses: response.entity.expenses});
        }
      });
    }
  }

  handleFilterChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.props.loggedIn || !this.state) {
      return null;
    }

    var rows = [];
    this.state.expenses.sort(function(a, b) {
      return a.date > b.date;
    })
    const beginDate = this.state.beginDate;
    const endDate = this.state.endDate;
    this.state.expenses.forEach(function(expense) {
      if ((!beginDate || expense.date >= beginDate)
          && (!endDate || expense.date <= endDate)) {
        rows.push(
          <ExpenseRow
            date={expense.date}
            cost={expense.cost}
            description={expense.description}
            user={expense.user}
            key={expense._id}
          />
        );
      }
    });

    return (
      <div>
        <h3> Expense Table </h3>
        <FilterBar handleChange={this.handleFilterChange}/>
        <table style={tableStyle} >
          <thead>
            <tr>
              <th>Date</th>
              <th>Cost</th>
              <th>Description</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class ExpenseRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.cost}</td>
        <td>{this.props.description}</td>
        <td>{this.props.user}</td>
      </tr>
    );
  }
}

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <input
          type="date"
          name="beginDate"
          onChange={this.handleChange}
        />
        <input
          type="date"
          name="endDate"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ExpenseTable;
