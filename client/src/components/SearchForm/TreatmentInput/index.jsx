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

  handleTreatment = e => {
    const { searchAction: treatmentSearch } = this.props;
    if (e) {
      treatmentSearch({
        name: 'treatment',
        value: e,
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
        {err && message.error(err)}
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
