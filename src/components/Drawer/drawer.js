import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, message } from 'antd';
import firebase from "../../config/firebase";

const { Option } = Select;

class DrawerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      category:"Fastfood"
    }
  }
  handleFoodName(e) {
    this.setState({
      fooditem: e.target.value
    })
  }
  handleDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleCategory(value) {
    this.setState({
      category:value
    })
    console.log(value)
  }

  onsubmitEvent() {
    this.insertData()
  }
  insertData = () => {
    let { fooditem, description, file ,category } = this.state;
    let currentUserId = firebase.auth().currentUser.uid;
    let storageRef = firebase.storage().ref().child(`foodItemImage/${file.name}`)
    storageRef.put(file).then((url) => {
      url.ref.getDownloadURL().then((urlref) => {
        var path = urlref;
        console.log(this.state.category)
        let obj = {
          fooditem,
          description,
          category,
          path
        }
        firebase.firestore().collection('fooditems').doc(currentUserId).collection("AllItems").doc()
          .set(obj).then((suceess) => {
            message.success("Item has been added")
          }).catch((eerr) => {
            message.error(eerr.message)
            console.log(eerr)
          })
      }).catch((eerr) => {
        message.error(eerr.message)
        console.log(eerr)
      })
    }).catch((eerr) => {
      message.error(eerr.message)
      console.log(eerr)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>

        <Drawer
          title="Upload Food Item"
          width={720}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please Enter Food Name' }],
                  })(<Input placeholder="Please Enter Food Name" onChange={(e) => this.handleFoodName(e)} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Upload Item Image">
                  {getFieldDecorator('Image', {
                    rules: [{ required: true, message: 'Please upload a image' }],
                  })(
                    <input type="file" id="img2" onChange={(e) => {
                      var img = e.target.files[0];
                      this.setState({
                        file: img
                      })
                    }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Select Food Category">
                  <Select defaultValue="Fastfood" style={{ width: 120 }} onChange={this.handleCategory.bind(this)}>
                    <Option value="Fastfood">Fastfood</Option>
                    <Option value="veg">veg</Option>
                    <Option value="salad">salad</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description & Item Price Enter Here">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ],
                  })(<Input.TextArea rows={6} placeholder="please enter url description" onChange={(e) => this.handleDescription(e)} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onsubmitEvent.bind(this)} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div >
    );
  }
}

const DrawerApp = Form.create()(DrawerForm);
export default DrawerApp;