import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import history from '../history/history'
import Signin from './signIn/Signin';
import Signup from './signup/signup';
class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Router>
    )
  }
}
export default Main