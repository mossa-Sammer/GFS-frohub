import React, { Component } from 'react';
import { Form } from 'antd';

import Button from '../Button';
import TreatmentInput from './TreatmentInput';
import LocationtInput from './LocationInput';
import TimeInput from './TimeInput';

import './style.css';

export default class SearchForm extends Component {
  render() {
    return (
      <div className="form__container">
        <Form className="search__form">
          <TreatmentInput />
          <LocationtInput />
          <TimeInput />
          <div className="search-btn">
            <Button>Search</Button>
          </div>
        </Form>
      </div>
    );
  }
}
