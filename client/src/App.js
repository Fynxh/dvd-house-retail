import React, { Component } from 'react';
import store from "./strore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
import loginPage from "./components/loginPage"
import Dashboard from "./components/dashboard"

import './App.scss'

class App extends Component {
  
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login' exact component={loginPage} />
            <Route path='/'  component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
