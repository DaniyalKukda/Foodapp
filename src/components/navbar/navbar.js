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
import { withRouter } from "react-router-dom";
import Drawerform from "../Drawer/drawer";
import "./navbar.css"

class SimpleAppBar extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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
            <div style={{ display: "flex" }}>
              {
                this.props.user ? this.props.user.type === "Resturant" ? <div><Button color="inherit" onClick={() => this.props.history.push("/home/detail-view")}>All Items</Button>
                <Button color="inherit" onClick={() => this.props.history.push("/resturantview")}>Order Status </Button>
                <Button type="inherit" onClick={this.showDrawer}>
                  Add <Icon type="plus" />
                </Button>
                <Drawerform onClose={this.onClose} visible={this.state.visible} /></div> : null :null
              }

              <Button color="inherit" onClick={this.Logout}>Logout <Icon type="logout" /></Button>
            </div>
          </Toolbar>
        </AppBar>
      </div >
    );
  }

}
const mapStateToProps = (state) => {
  return ({
    user: state.authReducers.user
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(removeUser())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimpleAppBar));