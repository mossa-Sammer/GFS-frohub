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
import './media.css';

class SearchForm extends Component {
  handleSearch = () => {
    const {
      status,
      history,
      searchQueries,
      filterServicesAction: filterServices,
      services,
      stores,
    } = this.props;
    if (status === 'homePage') {
      history.push('/services');
    } else {
      filterServices(stores, services, searchQueries);
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
          <span className="search__form-title">Discover. Book. Slay.</span>
          <Form.Item>
            <TreatmentInput />
          </Form.Item>
          <Form.Item>
            <LocationtInput />
          </Form.Item>
          <Form.Item className="search__form-time">
            <TimeInput />
          </Form.Item>
          <Form.Item className="search-btn">
            <Button onClick={this.handleSearch}>Search FroHub</Button>
          </Form.Item>
        </Form>
        <div className="title">
          <span>
            Find &amp; book afro <br />
            hair and beauty.
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchQueries: state.searchQueries,
    stores: state.services.stores,
    services: state.services.services,
  };
};

export default connect(mapStateToProps, { filterServicesAction })(
  withRouter(SearchForm)
);
