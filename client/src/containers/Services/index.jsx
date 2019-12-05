import React, { Component } from 'react';

import AdvancedSearch from './AdvancedSearch';
import { SearchForm } from '../../components';

import './style.css';

export default class ServicesPage extends Component {
  render() {
    return (
      <div>
        <SearchForm status="servicesForm" />
        <AdvancedSearch />
      </div>
    );
  }
}
