import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Icon } from 'antd';
import { connect } from "react-redux";
import { removeUser } from "../../store/action/action";
import { message } from 'antd';
import firebase from "../../config/firebase";
import {withRouter} from "react-router-dom";
import "./navbar.css"

class SimpleAppBar extends React.Component {

   Logout = () => {
    firebase.auth().signOut().then(() => {
      this.props.history.push('/')
      this.props.removeUser()
      message.success("logout successfully");
    }).catch((error) => {
      // An error happened.
      message.error(error.message);
    });
  }
  render() {
    // const classes = useStyles();
    return (
      <div>
        <AppBar style={{ backgroundColor: '#072e41' }} position="static">
          <Toolbar>
            <Typography style={{ color: 'white', fontSize: '1.75rem' }} variant="h5">
              Food App
          </Typography>
            <Button color="inherit" onClick={this.Logout}>Logout <Icon type="logout" /></Button>
          </Toolbar>
        </AppBar>
      </div >
    );
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(removeUser())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(SimpleAppBar));