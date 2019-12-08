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
      services: { loading, error, services, filtredServices },
    } = this.props;

    return (
      <div>
        <SearchForm status="servicesForm" />
        <AdvancedSearch />
        <div className="services__container">
          {error && message.error(error.message)}
          {loading ? (
            <Loading />
          ) : (
            filtredServices.map(service => (
              <ServiceCard key={service.id} data={service} />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ searchQueries, services, filtredServices }) => ({
  services,
  searchQueries,
  filtredServices,
});

export default connect(mapStateToProps, { getServices: getServicesAction })(
  ServicesPage
);
