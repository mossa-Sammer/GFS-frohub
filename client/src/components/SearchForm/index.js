import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'antd';

import { filterServices as filterServicesAction } from '../../containers/Services/services.actions';

import Button from '../Button';
import TreatmentInput from './TreatmentInput';
import LocationtInput from './LocationInput';
import TimeInput from './TimeInput';

import './style.css';

class SearchForm extends Component {
  handleSearch = () => {
    const {
      status,
      history,
      searchQueries,
      filterServicesAction: filterServices,
      services,
    } = this.props;
    if (status === 'homePage') {
      history.push('/services');
    } else {
      filterServices(services, searchQueries);
    }
  };

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
            <Button onClick={this.handleSearch}>Search Treatment</Button>
          </Form.Item>
        </Form>
        <div className="title">
          Black, Privileged <br /> & Global
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchQueries: state.searchQueries,
    services: state.services.services,
  };
};

export default connect(mapStateToProps, { filterServicesAction })(
  withRouter(SearchForm)
);
