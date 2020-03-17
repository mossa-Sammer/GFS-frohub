import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Skeleton, message } from 'antd';

import getTreatments from './treatments.action';
import searchAction from '../search.actions';
import { filterServices as filterServicesAction } from '../../../containers/Services/services.actions';

import './media.css';

const { Option } = Select;

class TreatmentInput extends Component {
  componentDidMount() {
    const { getTreatments: allTreatments } = this.props;
    allTreatments();
  }

  handleTreatment = (value, children) => {
    const {
      status,
      searchAction: treatmentSearch,
      searchQueries,
      filterServicesAction: filterServices,
      services,
      stores,
    } = this.props;
    let navTitle = '';
    if (children && children.props) {
      navTitle = children.props.children;
    }
    if (value) {
      treatmentSearch({
        name: 'treatment',
        value,
        treatmentName: navTitle,
      });
      if (status === 'servicesForm') {
        const queries = searchQueries;
        queries.treatment = value;
        filterServices(stores, services, queries);
      }
    } else {
      searchQueries.treatment = '';
      filterServices(stores, services, searchQueries);
      treatmentSearch({
        name: 'treatment',
        value: '',
        treatmentName: '',
      });
    }
  };

  render() {
    const { treatments, loading, err, searchQueries } = this.props;
    const { treatment: treatmentQuery } = searchQueries;
    return (
      <div className="treatment__input">
        {err && message.error(err.message)}
        <Select
          showSearch
          placeholder="Search hair and beauty"
          optionFilterProp="children"
          allowClear
          suffixIcon={<Icon type="search" />}
          onChange={this.handleTreatment}
          size="large"
          notFoundContent="No treatment match"
          dropdownRender={menu => {
            if (loading) return <Skeleton active paragraph={{ rows: 0 }} />;
            return <>{menu}</>;
          }}
          showAction={['focus', 'click']}
          defaultValue={treatmentQuery || undefined}
        >
          {treatments &&
            treatments.data &&
            treatments.data.length &&
            treatments.data.map(treatment => {
              return (
                <Option key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </Option>
              );
            })}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { treatments: allTreatments, searchQueries, stores, services } = state;
  const { treatments, loading, err } = allTreatments;
  return {
    treatments,
    loading,
    err,
    searchQueries,
    stores,
    services: services.services,
  };
};

export default connect(mapStateToProps, {
  getTreatments,
  searchAction,
  filterServicesAction,
})(TreatmentInput);
