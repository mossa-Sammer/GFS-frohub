import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Pagination, Empty } from 'antd';

import AdvancedSearch from './AdvancedSearch';
import { ServiceCard, Loading } from '../../components';
import { Layout } from '../index';
import getServicesAction from './services.actions';

import './style.css';

class ServicesPage extends Component {
  state = {
    pageCount: 1,
    pageSize: 9,
  };

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

  onPageChange = (page, pageSize) =>
    this.setState({ pageCount: page, pageSize });

  onPageSizeChange = (current, pageSize) => this.setState({ pageSize });

  paginate = sortedServices => {
    let { pageCount } = this.state;
    const { pageSize } = this.state;
    pageCount -= 1;
    let lesThanPage = false;
    if (!sortedServices[pageCount * pageSize + pageSize]) lesThanPage = true;
    return sortedServices.slice(
      pageCount * pageSize,
      lesThanPage ? sortedServices.length : pageCount * pageSize + pageSize
    );
  };

  render() {
    const {
      services: { loading, error, sortedServices },
    } = this.props;
    const { pageSize } = this.state;
    const paginatedServices = this.paginate(sortedServices);
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
                <p className="services__statistic">
                  Show all {sortedServices.length}
                </p>
                <AdvancedSearch />
              </div>
              {sortedServices.length ? (
                <>
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
                    showSizeChanger
                    pageSizeOptions={['9', '10', '20', '30']}
                    onShowSizeChange={this.onPageSizeChange}
                    className="services__pagination"
                    defaultPageSize={pageSize}
                    onChange={this.onPageChange}
                    total={sortedServices.length}
                  />
                </>
              ) : (
                <Empty description="No Results" />
              )}
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
