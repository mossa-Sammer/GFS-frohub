import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Skeleton, message } from 'antd';

import getTreatments from './treatments.action';
import searchAction from '../search.actions';

const { Option } = Select;

class TreatmentInput extends Component {
  componentDidMount() {
    const { getTreatments: allTreatments } = this.props;
    allTreatments();
  }

  handleTreatment = value => {
    const { searchAction: treatmentSearch } = this.props;
    if (value) {
      treatmentSearch({
        name: 'treatment',
        value,
      });
    } else {
      treatmentSearch({
        name: 'treatment',
        value: '',
      });
    }
  };

  render() {
    const { treatments, loading, err } = this.props;
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
          notFoundContent="No treatnemt match"
          dropdownRender={menu => {
            if (loading) return <Skeleton active paragraph={{ rows: 0 }} />;
            return <>{menu}</>;
          }}
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
  const { treatments, loading, err } = state.treatments;
  return {
    treatments,
    loading,
    err,
  };
};

export default connect(mapStateToProps, { getTreatments, searchAction })(
  TreatmentInput
);
