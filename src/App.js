import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreateAccount from './components/CreateAccount.js'
import Login from './components/Login.js'
import SubmitExpense from './components/SubmitExpense.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loggedIn: false,
      authToken: "" };
  }

  handleLogin(loggedIn, token) {
    this.setState({
      loggedIn: loggedIn,
      authToken: token
    });
  }

  render() {
    const loggedIn= this.state.loggedIn;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Expense Reporting</h2>
        </div>
        <CreateAccount loggedIn={loggedIn} />
        <Login loggedIn={loggedIn} onLogin={this.handleLogin}/>
        <SubmitExpense
          loggedIn={loggedIn}
          authToken={this.state.authToken}
        />
      </div>
    );
  }
}

export default App;
