import React, { Component } from 'react';

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto"
};

class ExpenseView extends Component {
  constructor(props) {
    super(props);
    this.handleChangeView = this.props.handleChangeView.bind(this);
    this.state = {};
  }

  render() {
    if (this.props.expenses.length === 0) {
      return (
        <div>
          No expenses to view.
        </div>
      );
    }

    var rows = [];
    const sortedExpenses = this.props.expenses.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    })
    sortedExpenses.forEach(function(expense) {
      rows.push(
        <ExpenseViewRow
          date={expense.date}
          cost={expense.cost}
          description={expense.description}
          user={expense.user}
          key={expense._id}
        />
      );
    });

    return (
      <div>
        <h3> View Expenses </h3>
        <button onClick={this.props.handleChangeView}> Change to Expense Report </button>
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

class ExpenseViewRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{parseFloat(this.props.cost).toFixed(2)}</td>
        <td>{this.props.description}</td>
        <td>{this.props.user}</td>
      </tr>
    );
  }
}

export default ExpenseView;
