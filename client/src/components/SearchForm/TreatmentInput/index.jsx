import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Input, Icon, Skeleton, Button, Radio } from 'antd';

import getTreatments from './treatments.action';
import searchAction from '../search.actions';
import { filterServices as filterServicesAction } from '../../../containers/Services/services.actions';

import searchLogic from './helper/search';

import './style.css';
import './media.css';

class TreatmentInput extends Component {
  state = {
    isOpen: false,
    treatments: [],
    filteredTreatments: [],
  };

  async componentDidMount() {
    const { getTreatments: allTreatments } = this.props;
    await allTreatments();
    const {
      treatments: { data: treatments },
    } = this.props;
    this.setState({ treatments, filteredTreatments: treatments });
  }

  handleTreatments = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleCloseTreatment = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleClear = () => {
    const {
      searchAction: treatmentSearch,
      searchQueries,
      filterServicesAction: filterServices,
      services,
      stores,
    } = this.props;
    searchQueries.treatment = '';
    filterServices(stores, services, searchQueries);
    treatmentSearch({
      name: 'treatment',
      value: '',
      treatmentName: '',
    });
    this.setState({ isOpen: false });
  };

  handleTreatment = e => {
    const {
      status,
      searchAction: treatmentSearch,
      searchQueries,
      filterServicesAction: filterServices,
      services,
      stores,
    } = this.props;
    if (e.target.value) {
      const { value: selectedTreatment } = e.target;
      const treatmentInfo = selectedTreatment.split(',');
      const [value, navTitle] = treatmentInfo;
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
      this.setState({ isOpen: false });
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

  handleSearch = ({ target: { value } }) => {
    const { treatments } = this.state;
    let filteredData = treatments;
    if (value) {
      filteredData = searchLogic(value, filteredData);
      this.setState({ filteredTreatments: filteredData });
    } else {
      this.setState({ filteredTreatments: treatments });
    }
  };

  render() {
    const { loading, err, searchQueries } = this.props;
    const { treatmentName: treatmentQuery } = searchQueries;
    const { isOpen, filteredTreatments } = this.state;
    return (
      <div className="treatment__input">
        {err && message.error(err.message)}
        <div>
          <div className="select-treatment">
            <Input
              className="select__treatment-input"
              prefix={<Icon type="search" />}
              placeholder="Search hear and beauty"
              onClick={this.handleTreatments}
              onChange={this.handleSearch}
              defaultValue={treatmentQuery}
            />
            <Button className="clear__treatment-btn" onClick={this.handleClear}>
              {treatmentQuery && 'X'}
            </Button>
          </div>
          {isOpen && (
            <div className="treatments__options-box">
              <Button
                className="close__treatments-btn"
                onClick={this.handleCloseTreatment}
              >
                Close
              </Button>
              <Input
                placeholder="Search hear and beauty"
                className="search__treatment-input"
                defaultValue={treatmentQuery}
                onChange={this.handleSearch}
              />
              <>{loading && <Skeleton active paragraph={{ rows: 0 }} />}</>
              {filteredTreatments && filteredTreatments.length ? (
                <Radio.Group
                  className="treatments__group"
                  onChange={this.handleTreatment}
                  value={treatmentQuery}
                >
                  {filteredTreatments.map(treatment => {
                    return (
                      <div
                        key={Math.random()}
                        className="treatment__option-box"
                      >
                        <Radio
                          value={`${treatment.id},${treatment.name}`}
                          key={Math.random()}
                        >
                          {treatment.name}
                        </Radio>
                      </div>
                    );
                  })}
                </Radio.Group>
              ) : (
                !loading && <>No treatments found</>
              )}
            </div>
          )}
        </div>
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
