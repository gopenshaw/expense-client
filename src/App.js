import React, { Component } from 'react';
import './App.css';

import CreateAccount from './components/CreateAccount.js'
import ExpenseContainer from './components/ExpenseContainer.js'
import Login from './components/Login.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      loggedIn: false,
      authToken: "",
      isAdmin: false };
  }

  handleLogin(loggedIn, token, username, isAdmin) {
    this.setState({
      loggedIn: loggedIn,
      authToken: token,
      username: username,
      isAdmin: isAdmin
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Expense Reporting</h2>
        </div>
        <CreateAccount loggedIn={loggedIn} />
        <Login loggedIn={loggedIn} onLogin={this.handleLogin}/>
        <ExpenseContainer
          loggedIn={loggedIn}
          authToken={this.state.authToken}
          username={this.state.username}
          isAdmin={this.state.isAdmin}
        />
      </div>
    );
  }
}

export default App;
