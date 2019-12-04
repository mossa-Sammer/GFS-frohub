import React, { Component } from 'react';
import { Form } from 'antd';

import Button from '../Button';
import TreatmentInput from './TreatmentInput';
import LocationtInput from './LocationInput';
import TimeInput from './TimeInput';

import './style.css';

export default class SearchForm extends Component {
  render() {
    const { status } = this.props;
    return (
      <div className="form__container">
        <Form
          className={`search__form ${
            status && status === 'homePage'
              ? 'home-search__form'
              : 'services-search__form'
          }`}
        >
          <Form.Item>
            <TreatmentInput />
          </Form.Item>
          <Form.Item>
            <LocationtInput />
          </Form.Item>
          <Form.Item>
            <TimeInput />
          </Form.Item>
          <Form.Item className="search-btn">
            <Button>Search Treatment</Button>
          </Form.Item>
        </Form>
        <div className="title">
          Black, Privileged <br /> & Global
        </div>
      </div>
    );
  }
}
