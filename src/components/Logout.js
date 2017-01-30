import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.props.onLogout.bind(this);
  }

  render() {
    if (!this.props.loggedIn) {
      return null
    }

    return (
      <div>
        <button onClick={this.onLogout}> Logout </button>
      </div>
    )
  }
}

export default Logout;
