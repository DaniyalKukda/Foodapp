import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import Navbar from '../navbar/navbar';
import Resturantsusertabview from "../tabsview/Resturantusertabview/resturantusertabview";
import Myrequestusertabview from '../tabsview/Myrequestusertabview/myrequestusertabview';
import "./userview.css"

const { TabPane } = Tabs;
const center = {
  textAlign:"center"
}
class Userview extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <div style={center}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="shop" />
                Resturants
              </span>
            }
            key="1"
          >
            <Resturantsusertabview />
           </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="pull-request" />
                My Request
        </span>
            }
            key="2"
          >
            <Myrequestusertabview />
    </TabPane>
        </Tabs>
        </div>
      </div>
    );
  }
}
export default Userview