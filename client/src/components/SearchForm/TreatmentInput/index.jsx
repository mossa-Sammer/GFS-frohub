import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Skeleton } from 'antd';

import getTreatments from './treatments.action';
import searchAction from '../search.actions';

const { Option } = Select;

class TreatmentInput extends Component {
  componentDidMount() {
    // console.log(222222, this.props);
    const { getTreatments: allTreatments } = this.props;
    allTreatments();
  }

  handleTreatment = e => {
    // console.log(111, e);
    const { searchAction: treatmentSearch } = this.props;
    if (e) {
      // console.log(11111, e);
      // console.log(666, this.props.searchAction);
      treatmentSearch({
        name: 'treatment',
        value: e,
      });
    } else {
      // console.log('Empty');
      treatmentSearch({
        name: 'treatment',
        value: '',
      });
    }
  };

  render() {
    const { treatments, loading } = this.props;
    // console.log(765, treatments);
    return (
      <div className="treatment__input">
        <Select
          showSearch
          placeholder="Search hair and beauty"
          style={{ width: '100%' }}
          optionFilterProp="children"
          allowClear
          suffixIcon={<Icon type="search" />}
          onChange={this.handleTreatment}
        >
          {!loading ? (
            treatments &&
            treatments.data &&
            treatments.data.length &&
            treatments.data.map(treatment => {
              return (
                <Option key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </Option>
              );
            })
          ) : (
            <Option key={Math.random()} value={Math.random()}>
              <Skeleton active paragraph={{ rows: 0 }} />
            </Option>
          )}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(444, state.treatments.treatments);
  const { treatments, loading } = state.treatments;
  // console.log(99, treatments, loading);
  return {
    treatments,
    loading,
  };
};

export default connect(mapStateToProps, { getTreatments, searchAction })(
  TreatmentInput
);
