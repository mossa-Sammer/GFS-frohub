import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import AdvancedSearch from './AdvancedSearch';
import { ServiceCard, Loading } from '../../components';
import { Layout } from '../index';
import getServicesAction from './services.actions';

import './style.css';

class ServicesPage extends Component {
  componentDidMount() {
    const { getServices, searchQueries } = this.props;

    getServices(searchQueries);
  }

  getStoreType = storeId => {
    const {
      services: { stores },
    } = this.props;
    let storeType;

    for (let i = 0; i < stores.length; i += 1) {
      const store = stores[i];
      if (store.id === storeId) {
        storeType = store.categories[0].name;
        break;
      }
    }
    return storeType;
  };

  render() {
    const {
      services: { loading, error, sortedServices },
    } = this.props;
    return (
      <>
        <Layout status="servicesForm" />
        <div className="services__container">
          {error && message.error(error.message)}
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="services__header">
                <AdvancedSearch />
                <p className="services__statistic">
                  Show all {sortedServices.length}
                </p>
              </div>
              <div className="services__cards">
                {sortedServices.map(service => (
                  <div key={service.id}>
                    <ServiceCard
                      data={service}
                      storeType={this.getStoreType(service.store.id)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </>
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
