import React, { Component } from 'react';

import { Form, Input, Button, Radio, message } from 'antd';

import './style.css';

// import axios from '../../../axios-config';

// import { ADMIN_PARTNERS_URLS } from '../../../routes_urls';

class AddNewUser extends Component {
  state = {
    err: false,
    errMsg: '',
  };

  handleFormChange = () => {
    const {
      form: { getFieldsError },
    } = this.props;

    const isError = Object.values(getFieldsError()).some(e => e !== undefined);
    this.setState({ err: isError });
  };

  // handleRole = role => this.setState({ role });

  handleAddNewUser = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        // try {
        //   const { email, firstName, lastName, password, role } = values;
        //   await axios.post('/admin/users', {
        //     email,
        //     firstName,
        //     lastName,
        //     password,
        //     role,
        //   });
        //   message.success('Successfully Added!');
        //   setTimeout(() => history.push(ADMIN_PARTNERS_URLS), 1500);
        // } catch (error) {
        //   console.log(error.status);
        //   if (error.status === 422) {
        //     return this.setState({
        //       err: true,
        //       errMsg: 'Email is Already Exist',
        //     });
        //   }
        //   this.setState({ err: true, errMsg: 'Internal Server Error' });
        // }
      }
    });
  };

  render() {
    const { err, errMsg } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <h2>Add New User</h2>
        {err && <span>{errMsg}</span>}
        <Form
          className="add__new__user-container"
          onSubmit={this.handleAddNewUser}
          onChange={this.handleFormChange}
          layout="vertical"
        >
          <Form.Item className="new__user-form-item" label="Email Address">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
                {
                  required: true,
                  message: 'Please enter a valid email address',
                },
              ],
            })(<Input name="email" />)}
          </Form.Item>
          <Form.Item
            className="new__user-form-item new__user__name-field"
            label="First Name"
          >
            {getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your first name',
                },
                {
                  whitespace: true,
                  message: 'Please enter your first name',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            className="new__user__name-field last__name-field"
            label="Last Name"
          >
            {getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your last name',
                },
                {
                  whitespace: true,
                  message: 'Please enter your last name',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item className="new__user-form-item" label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  min: 6,
                  message: 'Password should be at least 6 characters',
                },
                {
                  required: true,
                  message: 'Password should be at least 6 characters',
                },
              ],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item className="new__user-form-item" label="Role">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: 'Role is required',
                },
              ],
            })(
              <Radio.Group onChange={this.handleRole}>
                <Radio value="admin">Admin</Radio>
                <Radio value="stylist">Stylist</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Button htmlType="submit" onClick={this.showModal}>
            Add New User
          </Button>
        </Form>
      </div>
    );
  }
}

const WrappedAddUSerForm = Form.create({
  name: 'Add New User',
})(AddNewUser);

export default WrappedAddUSerForm;
