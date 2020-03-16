/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Pagination, Empty, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import AdvancedSearch from './AdvancedSearch';
import SearchForm from '../../components/SearchForm';
import { ServiceCard, Loading } from '../../components';
import getServicesAction from './services.actions';

import { SERVICES_URL } from '../../routes_urls';

import './style.css';
import './media.css';

class ServicesPage extends Component {
  state = {
    pageCount: 1,
    pageSize: 9,
    scrolled: false,
  };

  componentDidMount() {
    const { getServices, searchQueries } = this.props;
    getServices(searchQueries);
    this.setState({ scrolled: true });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const isTop = window.scrollY < 100;
    if (!isTop) {
      this.setState({ scrolled: true });
    }
  };

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

  handleForm = () => this.setState({ scrolled: false });

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
      searchQueries,
      match,
    } = this.props;
    const isServicesPage = match.url === SERVICES_URL;
    const { pageSize, scrolled } = this.state;
    const paginatedServices = this.paginate(sortedServices);
    return (
      <>
        <div className={`${scrolled ? 'min-header' : 'header'}`}>
          <div className="left-header">
            {scrolled ? (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div onClick={this.handleForm} className="small">
                <Icon type="search" className="small__form-seach-icon" />
                <div className="search-info">
                  <div className="small__box-right">
                    {searchQueries.treatmentName
                      ? searchQueries.treatmentName
                      : 'All Hair and Beauty'}
                  </div>
                  <div>
                    <span>
                      {searchQueries.location ? (
                        <span>
                          {' '}
                          in {searchQueries.location.display_name.split(',')[0]}
                        </span>
                      ) : (
                        <span className="search-info__location">
                          Any location
                        </span>
                      )}
                    </span>
                    <span className="search-info__date-time">
                      {searchQueries.date ? (
                        <span className="search-info__date">{`${
                          searchQueries.date
                            ? `${moment(searchQueries.date).format(
                                'DD'
                              )}/${moment(searchQueries.date).format('MM')}`
                            : 'Any Date'
                        } `}</span>
                      ) : (
                        <span className="search-info__date">Any Date</span>
                      )}
                      {searchQueries.time.from && (
                        <span className="search-info__time">
                          {searchQueries.time.from && searchQueries.time.to
                            ? `${searchQueries.time.from} - ${searchQueries.time.to}`
                            : ''}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <SearchForm
                status="servicesForm"
                className={scrolled ? 'hidden-form' : 'visible-form'}
              />
            )}
          </div>
          <div className="treatment-title">
            {isServicesPage && (
              <span className="frohub__banner-headline">
                {searchQueries.treatmentName ? (
                  searchQueries.treatmentName
                ) : (
                  <>All Hair and Beauty</>
                )}
              </span>
            )}
          </div>
        </div>
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
  withRouter(ServicesPage)
);
