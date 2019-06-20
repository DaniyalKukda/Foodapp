import React, { Component } from 'react';
import { Tabs } from 'antd';
import Navbar from '../navbar/navbar';
import Statusresturanttabview from "../tabsview/Statusresturanttabview/statusresturanttabview";
import "./userview.css"

const { TabPane } = Tabs;
const center = {
  textAlign: "center"
}
class Resturantview extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          title: 'random1',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'delivered',
        },
        {
          title: 'random2',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'inprogress',
        },
        {
          title: 'random3',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'pending',
        },
        {
          title: 'Rnfom4',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'delivered',
        },
        {
          title: 'random5',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'inprogress',
        },

        {
          title: 'random6',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'pending',
        },
        {
          title: 'random7',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'delivered',
        },
        {
          title: 'random1',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'inprogress',
        },
        {
          title: 'delivered',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'pending',
        },
        {
          title: 'delivered',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'delivered',
        },
        {
          title: 'delivered',
          description: "Impostor Syndrome is a pervasive feeling of self-doubt, insecurity, or fraudulence",
          status: 'inprogress',
        },

      ]
    }
  }
  render() {
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