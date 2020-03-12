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

  handleTreatment = (value, children) => {
    let navTitle = '';
    if (children && children.props) {
      navTitle = children.props.children;
    }
    const { searchAction: treatmentSearch } = this.props;
    if (value) {
      treatmentSearch({
        name: 'treatment',
        value,
        treatmentName: navTitle,
      });
    } else {
      treatmentSearch({
        name: 'treatment',
        value: '',
        treatmentName: '',
      });
    }
  };

  render() {
    const { treatments, loading, err, treatmentQuery } = this.props;
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
  const { treatment: treatmentQuery } = state.searchQueries;
  const { treatments, loading, err } = state.treatments;
  return {
    treatments,
    loading,
    err,
    treatmentQuery,
  };
};

export default connect(mapStateToProps, { getTreatments, searchAction })(
  TreatmentInput
);
