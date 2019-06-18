import React from 'react';
import {
    Form,
    Input,
    Select,
    InputNumber,
    Checkbox,
    Button,
    Radio,
    Upload,
    message,
    Icon
} from 'antd';
import { NavLink } from "react-router-dom";
import './index.css'
import { signupAuth ,ResturantRegistration } from '../../Auth/signupauth'

const { Option } = Select;

class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            radioValue: "User",
        };

    }
    
    // uploadimg = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log('uploadimg==>>', info.file, info.fileList);
    //             this.setState({
    //                 file:info.file
    //             })
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };
    // HandleCertificate = (info) => {
        
    // }
    onChange = (value) => {
        this.setState({
            gender: value
        })
    }
    onChangeAge = (value) => {
        this.setState({
            age: value
        })
    }

    onChangerRadio = e => {
        this.setState({
            radioValue: e.target.value,
        });
    };


    handleSubmitUser = e => {
        let { fullName, gender, age, country, city, radioValue } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var allUserData = {
                    fullName,
                    email: values.email,
                    password: values.password,
                    gender,
                    age,
                    country,
                    city,
                    type: radioValue
                }
                console.log(allUserData);
                signupAuth(allUserData)
            }
        });
    };
    handleSubmitResturant = e => {
        let { resturantName, ownerName, file, country, city, radioValue } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let resturantData = {
                    resturantName,
                    ownerName,
                    country,
                    city,
                    type: radioValue,
                    file,
                    email:values.email,
                    password:values.password
                }
                ResturantRegistration(resturantData)
            }
        })
    }
    handleResturantName = e => {
        this.setState({
            resturantName: e.target.value
        })
    }
    handleOwnerName = e => {
        this.setState({
            ownerName: e.target.value
        })
    }
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    HandleFullName = (e) => {
        this.setState({
            fullName: e.target.value
        })
    }
    handleCountry = (e) => {
        this.setState({
            country: e.target.value
        })
    }
    handleCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="signUpmainDiv">
                <h1 className="SignUpheading">Food App</h1>
                <span className="line"></span>
                <div className="SignUpFormDiv">
                    <h1>Sign Up</h1>
                    <div className="radioDiv">
                        <Radio.Group onChange={this.onChangerRadio} value={this.state.radioValue}>
                            <Radio value="User">User</Radio>
                            <Radio value="Resturant">Resturant</Radio>
                        </Radio.Group>
                    </div>
                    {this.state.radioValue === "User" ? <Form {...formItemLayout} onSubmit={this.handleSubmitUser}>
                        <p>Register as a user</p>
                        <Form.Item label="Full-Name">
                            <Input onChange={(e) => this.HandleFullName(e)} />
                        </Form.Item>


                        <Form.Item label="E-mail">
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
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    Gender
                            </span>
                            }
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please select your gender', whitespace: true }],
                            })(<Select
                                showSearch
                                style={{ width: 400 }}
                                onChange={this.onChange}
                            >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="Age">
                            <InputNumber min={10} max={100} defaultValue={12} onChange={this.onChangeAge} />
                        </Form.Item>
                        <Form.Item label="Country">
                            <Input onChange={(e) => this.handleCountry(e)} />
                        </Form.Item>
                        <Form.Item label="City">
                            <Input onChange={(e) => this.handleCity(e)} />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
          </Button>
                        </Form.Item>
                        <NavLink to="/">already have an account ?</NavLink>

                    </Form>
                        :
                        <Form {...formItemLayout} onSubmit={this.handleSubmitResturant}>
                            <p>Register as a Resturant</p>

                            <Form.Item label="Resturant-Name">
                                <Input onChange={(e) => this.handleResturantName(e)} />
                            </Form.Item>
                            <Form.Item label="Owner-Name">
                                <Input onChange={(e) => this.handleOwnerName(e)} />
                            </Form.Item>
                            <Form.Item label="E-mail">
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
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input.Password />)}
                            </Form.Item>
                            <Form.Item label="Confirm Password" hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ],
                                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                            </Form.Item>
                            <Form.Item label="Country">
                                <Input onChange={(e) => this.handleCountry(e)} />
                            </Form.Item>
                            <Form.Item label="City">
                                <Input onChange={(e) => this.handleCity(e)} />
                            </Form.Item>
                            {/* <Form.Item label="Certificate">
                                {/* <Upload {...this.uploadimg}>
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload> */}
                            {/* //</Form.Item> */}
                            
                            <input type="file" id="img" onChange={() => {
                                var img = document.getElementById("img").files[0]
                                this.setState({
                                    file:img
                                })
                                console.log(img)
                            }} />

                            <Form.Item {...tailFormItemLayout}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>
                                        I have read the <a href="">agreement</a>
                                    </Checkbox>,
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Register
          </Button>
                            </Form.Item>
                            <NavLink to="/">already have an account ?</NavLink>

                        </Form>
                    }

                </div>
            </div>

        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Signup);
export default WrappedRegistrationForm