import React, { Component } from 'react';
import { Tabs } from 'antd';
import Navbar from '../navbar/navbar';
import Statusresturanttabview from "../tabsview/Statusresturanttabview/statusresturanttabview";
import firebase from "../../config/firebase";
import { connect } from "react-redux";
import "./userview.css"

const { TabPane } = Tabs;
const center = {
  textAlign: "center"
}
class Resturantview extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.fetchOrder()
  }
  fetchOrder() {
    firebase.firestore().collectionGroup("All Orders").onSnapshot((success) => {
      // console.log(success.data())
      let data = []
      success.forEach((doc) => {
        let res = doc.data();
        let uid = this.props.user.uid;
        if (res.ResturantID === uid) {
          // console.log(doc.id, " => ", doc.data())
          data.push(res)
        }
        this.setState({
          data,
          docid : doc.id 
        })
      })
    })
  }
  render() {
    console.log(this.state.data)
    console.log(this.state.docid)
    return (
      <div>
        <Navbar />
        <div style={center}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  Pending
              </span>
              }
              key="1"
            >
              <Statusresturanttabview data={this.state.data} type="pending" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  In progress
        </span>
              }
              key="2"
            >
              <Statusresturanttabview data={this.state.data} type="inprogress" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  Delivered
        </span>
              }
              key="3"
            >
              <Statusresturanttabview data={this.state.data} type="delivered" />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    user: state.authReducers.user
  })
}
export default connect(mapStateToProps, null)(Resturantview)