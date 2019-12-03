import React, { Component } from 'react';

import Button from '../Button';
import TreatmentInput from './TreatmentInput';
import LocationtInput from './LocationInput';
import TimeInput from './TimeInput';

export default class SearchForm extends Component {
  render() {
    return (
      <div>
        <TreatmentInput />
        <LocationtInput />
        <TimeInput />
        <Button>Search</Button>
      </div>
    );
  }
}
