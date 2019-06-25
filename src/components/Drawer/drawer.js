import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';


const { Option } = Select;

class DrawerForm extends React.Component {
  constructor(){
    super();
    this.state = {
      fooditem:"",
      description:""
    }
  }
  handleDescription(e){
    this.setState({
      description:e.target.value
    })
  }
  handleFoodName(e){
    this.setState({
      fooditem:e.target.value
    })
  }
  onsubmitEvent(){
    console.log(this.state)
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
                  })(<Input placeholder="Please Enter Food Name" onClick={(e)=> this.handleFoodName(e)} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Upload Item Image">
                  {getFieldDecorator('Image', {
                    rules: [{ required: true, message: 'Please upload a image' }],
                  })(
                    <input type="file" id="img2" onChange={(e) => {
                      var img = e.files[0];
                      console.log(img)
                      // this.setState({
                      //   file: img
                      // })
                      console.log(img)
                    }} />
                  )}
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
      </div>
    );
  }
}

const DrawerApp = Form.create()(DrawerForm);
export default DrawerApp;