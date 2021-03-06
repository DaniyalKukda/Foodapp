import React from 'react';
import { Form, Icon, Input, Button, Checkbox ,message } from 'antd';
import { NavLink } from "react-router-dom";
import Login from '../../Auth/loginauth';
import { connect } from "react-redux";
import { updateUser } from './../../store/action/action';
import './index.css';

class Signin extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                Login(values).then((data) => {
                    this.props.updateUser(data)
                    if (data.type === "User") {
                        this.props.history.push("./userview")
                    } else if (data.type === "Resturant") {
                        this.props.history.push("./resturantview")
                    }
                    message.success(data.type +'Login successfully');
                }).catch((err)=>{
                    message.error(err,message);

                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(getFieldDecorator)
        return (
            <div className="mainDiv">
                <h1 className="heading">Food App</h1>
                <span className="line"></span>
                <div className="FormDiv">
                    <h1>Sign In</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="example@email.com"
                            />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
          </a>

                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
          </Button><br />
                        <NavLink className="already" to="/signup">Register Now!</NavLink>
                    </Form>
                </div>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser : (user) => dispatch(updateUser(user))
    }

}

export default connect(null,mapDispatchToProps)(WrappedNormalLoginForm)