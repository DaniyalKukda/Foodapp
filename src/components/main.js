import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import history from '../history/history'
import Signin from './signIn/Signin';
import Signup from './signup/signup';
import Userview from './dashboard/userview';
import Resturantview from './dashboard/resturantview';
class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/userview" component={Userview} />
        <Route path="/resturantview" component={Resturantview} />
      </Router>
    )
  }
}
export default Main