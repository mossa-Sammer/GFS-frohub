import React, { Component } from 'react';
import { Button, Form, Input, Select, Col, Row } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import countries from 'country-data';

import { BUSINESS_URL } from '../../../routes_urls';
import './style.css';

const { Option } = Select;

class PersonalForm extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { all: codes } = countries.callingCodes;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+44',
    })(
      <Select
        showSearch
        style={{ width: 100 }}
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
      >
        {codes.map(c => (
          <Option value={c}>{c}</Option>
        ))}
      </Select>
    );

    return (
      <div>
        <h3>Personal details</h3>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item label="Email">
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
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ],
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="first name">
                {getFieldDecorator('first name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your first name',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} offset={3}>
              <Form.Item label="last name">
                {getFieldDecorator('last name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your last name',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Link to={BUSINESS_URL}>
              <Button className="personal-next-btn" type="primary">
                Next
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedPersonalForm = Form.create({ name: 'personal' })(PersonalForm);

export default withRouter(WrappedPersonalForm);
