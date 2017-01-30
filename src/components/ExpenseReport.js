import React, { Component } from 'react';

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto"
};

const weeklyExpenseStyle = {
  margin: 10
};

class ExpenseReport extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    this.state = {};
  }

  handleFilterChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  sumExpenses(rows) {
    return rows.map(function(a) { return parseFloat(a.props.cost); })
              .reduce(function(a, b) { return a + b; }, 0);
  }

  render() {
    if (this.props.expenses.length === 0) {
      return (
        <div>
          You have no expenses.
        </div>
      );
    }

    var rows = [];
    const sortedExpenses = this.props.expenses.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    })
    const beginDate = this.state.beginDate;
    const endDate = this.state.endDate;
    const username = this.props.username;
    sortedExpenses.forEach(function(expense) {
      if ((!beginDate || expense.date >= beginDate)
          && (!endDate || expense.date <= endDate)
          && username === expense.user) {
        rows.push(
          <ExpenseReportRow
            date={expense.date}
            cost={expense.cost}
            description={expense.description}
            user={expense.user}
            key={expense._id}
          />
        );
      }
    });

    const expenseSum = this.sumExpenses(rows);

    return (
      <div>
        <h3> Expense Report </h3>
        <button onClick={this.props.handleChangeView}> Change to Expense View </button>
        <FilterBar handleChange={this.handleFilterChange}/>
        <WeeklyExpenses
          beginDate={beginDate}
          endDate={endDate}
          expenseSum={expenseSum}
        />
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

class ExpenseReportRow extends Component {
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

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        Begin Date <input
          type="date"
          name="beginDate"
          onChange={this.handleChange}
        /> <br/>
        End Date <input
          type="date"
          name="endDate"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class WeeklyExpenses extends Component {
  calculate(firstDate, lastDate, expenseSum) {
    var days = Math.round((new Date(lastDate) - new Date(firstDate)) / (1000 * 60 * 60 * 24));
    var weeks = Math.round(days / 7)
    if (weeks < 1) weeks = 1;
    return expenseSum / weeks;
  }

  render() {
    if (!this.props.beginDate || !this.props.endDate
        || this.props.endDate < this.props.beginDate) {
      return null;
    }

    const weeklyExpenses = this.calculate(
      this.props.beginDate,
      this.props.endDate,
      this.props.expenseSum
    );

    return (
      <div style={weeklyExpenseStyle}>
        Total Expenses: {this.props.expenseSum.toFixed(2)} <br/>
        Weekly Expenses: {weeklyExpenses.toFixed(2)} <br/>
      </div>
    );
  }
}

export default ExpenseReport;
