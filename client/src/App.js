import React, { Component } from 'react';
import store from "./strore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
// import loginPage from "./components/loginPage"

class App extends Component {
  
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route path='/login' exact component={loginPage} /> */}
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
