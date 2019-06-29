import React, { Component } from 'react';
import { Tabs } from 'antd';
import Navbar from '../navbar/navbar';
import Statusresturanttabview from "../tabsview/Statusresturanttabview/statusresturanttabview";
import firebase from "../../config/firebase"
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
  componentDidMount(){
    this.fetchOrders()
  }
  fetchOrders() {
    firebase.firestore().collection('Order').doc().collection("All Orders").onSnapshot((success) => {
      let data = [];
      // console.log(success.data())
      success.forEach((doc) => { 
        console.log(doc.data())
        data.push(doc.data())
      })
      this.setState({ data })

    })
  }
  render() {
    console.log(this.state.data)
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
export default Resturantview