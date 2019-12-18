import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import AdvancedSearch from './AdvancedSearch';
import { SearchForm, ServiceCard, Loading } from '../../components';
import getServicesAction from './services.actions';

import './style.css';

class ServicesPage extends Component {
  componentDidMount() {
    const { getServices, searchQueries } = this.props;

    getServices(searchQueries);
  }

  render() {
    const {
      services: { loading, error, sortedServices },
    } = this.props;
    return (
      <div>
        <SearchForm status="servicesForm" />
        <div className="services__container">
          {error && message.error(error.message)}
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="services__header">
                <AdvancedSearch />
                <p className="services__statistic">
                  Choose from {sortedServices.length} venues offering hair and
                  beauty Salons in London
                </p>
              </div>
              <div className="services__cards">
                {sortedServices.map(service => (
                  <div key={service.id}>
                    <ServiceCard data={service} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ searchQueries, services, sortedServices }) => ({
  services,
  searchQueries,
  sortedServices,
});

export default connect(mapStateToProps, { getServices: getServicesAction })(
  ServicesPage
);
