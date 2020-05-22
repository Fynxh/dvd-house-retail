import React, { Component } from 'react';
import store from "./strore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
import loginPage from "./components/loginPage"
import DefaultLayout from "./layout/DefaultLayout"

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
            <Route path='/' name='Home' component={DefaultLayout} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
