import React, { Component } from 'react';

class CreateAccount extends Component {
  render() {
    return (
      <div>
        <h3> Create Account </h3>
        <form>
        Username <input name="Username" /> <br/>
        Password <input name="Password" /> <br/>
        <button> Create a new account </button>
        </form>
      </div>
    )
  }
}

export default CreateAccount;
