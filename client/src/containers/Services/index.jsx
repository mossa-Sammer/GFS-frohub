import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Pagination } from 'antd';
import AdvancedSearch from './AdvancedSearch';
import { ServiceCard, Loading } from '../../components';
import { Layout } from '../index';
import getServicesAction from './services.actions';

import './style.css';

class ServicesPage extends Component {
  state = {
    pageCount: 1,
  };

  componentDidMount() {
    const { getServices, searchQueries } = this.props;

    getServices(searchQueries);
  }

  onPageChange = page => this.setState({ pageCount: page });

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

  paginate = sortedServices => {
    let { pageCount } = this.state;
    pageCount -= 1;
    let lesThanPage = false;
    if (!sortedServices[pageCount * 10 + 9]) lesThanPage = true;
    return sortedServices.slice(
      pageCount * 10,
      lesThanPage ? sortedServices.length : pageCount * 10 + 10
    );
  };

  render() {
    const {
      services: { loading, error, sortedServices },
    } = this.props;
    const paginatedServices = this.paginate(sortedServices);
    return (
      <React.Fragment className="services-page">
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
                {paginatedServices.map(service => (
                  <div key={service.id}>
                    <ServiceCard
                      data={service}
                      storeType={this.getStoreType(service.store.id)}
                    />
                  </div>
                ))}
              </div>
              <Pagination
                className="services__pagination"
                defaultPageSize={10}
                onChange={this.onPageChange}
                total={sortedServices.length}
              />
            </>
          )}
        </div>
      </React.Fragment>
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
