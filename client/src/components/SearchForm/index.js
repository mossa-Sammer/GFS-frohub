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
    const { status, searchQueries } = this.props;
    const { treatmentName } = searchQueries;
    const isServicesPage = status === 'servicesForm';
    return (
      <div
        className={
          !isServicesPage
            ? 'form__container form__container-home'
            : 'form__container form__container-services'
        }
      >
        <Form
          className={`search__form ${
            !isServicesPage ? 'home-search__form' : 'services-search__form'
          }`}
        >
          <span
            className={
              isServicesPage ? 'form__title-hidden' : 'search__form-title'
            }
          >
            Discover. Book. Slay.
          </span>
          <Form.Item className="search__form-item">
            <TreatmentInput status={status} />
          </Form.Item>
          <Form.Item className="search__form-item">
            <LocationtInput status={status} />
          </Form.Item>
          <Form.Item className="search__form-time">
            <TimeInput />
          </Form.Item>
          {!isServicesPage && (
            <Form.Item className="search-btn">
              <Button onClick={this.handleSearch}>Search FroHub</Button>
            </Form.Item>
          )}
        </Form>
        {isServicesPage ? (
          <div className="title services__title">
            <span className="frohub__banner-headline">
              {searchQueries.treatmentName ? (
                treatmentName
              ) : (
                <>All Hair and Beauty</>
              )}
            </span>
          </div>
        ) : (
          <div className="title home__title">
            <span className="frohub__banner-headline">
              Find &amp; book afro
            </span>
            <span className="frohub__banner-headline">hair and beauty</span>
          </div>
        )}
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
