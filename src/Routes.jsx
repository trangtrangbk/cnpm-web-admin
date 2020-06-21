import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './views/auth/login/Login';
import Index from './views/Index';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      isAuthToken: true
    };
  }

  onLoggedInHanlder = (token) => {
    this.setState({
      token
    });
  };

  render() {
    const { token } = this.state;
    let content = (
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <Login onLoggedIn={this.onLoggedInHandlder} />}
        />
        <Redirect
          exact
          from="/"
          to="/login"
        />
      </Switch>
    );
    if (token) {
        content = (
         <Index />
        );
    }
    return content;
  }
}
