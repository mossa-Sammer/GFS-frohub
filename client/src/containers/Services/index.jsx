import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Row, Col } from 'antd';

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
      services: { loading, error, filtredServices },
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
            <div className="services__container">
              <p>
                Choose from {filtredServices.length} venues offering hair and
                beauty Salons in London
              </p>
              <Row>
                {filtredServices.map(service => (
                  <Col key={service.id} xs={{ span: 4 }} lg={{ span: 6 }}>
                    <ServiceCard data={service} />
                  </Col>
                ))}
              </Row>
            </div>
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
