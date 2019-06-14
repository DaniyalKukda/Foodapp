import React from 'react';
import {
    Form,
    Input,
    Select,
    InputNumber,
    Checkbox,
    Button,
    Radio
} from 'antd';
import './index.css'

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}




class Signup extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        radioValue: "User",
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

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
            <div className="SignUpFormDiv">
                <h1>Sign Up</h1>
                <div className="radioDiv">
                    <Radio.Group onChange={this.onChange} value={this.state.radioValue}>
                        <Radio value="User">User</Radio>
                        <Radio value="Resturant">Resturant</Radio>
                    </Radio.Group>
                </div>
                {this.state.radioValue === "User" ? <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <p>Register as a user</p>
                    <Form.Item label="Full-Name">
                        <Input />
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
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Age">
                        <InputNumber min={10} max={100} defaultValue={12} onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input />
                    </Form.Item>
                    <Form.Item label="City">
                        <Input />
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
                    <a href="">already have an account ?</a>

                </Form>
                    :
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <p>Register as a Resturant</p>

                        <Form.Item label="Resturant-Name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Owner-Name">
                            <Input />
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
                            <Input />
                        </Form.Item>
                        <Form.Item label="City">
                            <Input />
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
                        <a href="">already have an account ?</a>

                    </Form>
                }

            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Signup);
export default WrappedRegistrationForm