import React from 'react';
import { Tabs } from 'antd';
import Progress from './status/status'
import firebase from "../../../config/firebase"
const { TabPane } = Tabs;
class Myrequestusertabview extends React.Component {
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
        let uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection('Order').doc(uid).collection("All Orders").onSnapshot((success) => {
            let data = [];
            success.forEach((doc) => {
                data.push(doc.data())
            })
            this.setState({data})

        })
    }
    render() {
        console.log(this.state.data)
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="All Request" key="1">
                        <Progress type="all" data={this.state.data} />
                    </TabPane>
                    <TabPane tab="Pending" key="2">
                        <Progress type="pending" data={this.state.data} />
                    </TabPane>
                    <TabPane tab="In Progress" key="3">
                        <Progress type="inprogress" data={this.state.data} />
                    </TabPane>
                    <TabPane tab="Delivered" key="4">
                        <Progress type="delivered" data={this.state.data} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}
export default Myrequestusertabview