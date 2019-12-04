import React, { Component } from 'react';
import { Select, Icon } from 'antd';

const { Option } = Select;

const treatments = [
  {
    id: 1,
    name: 't1',
  },
  {
    id: 2,
    name: 't2',
  },
  {
    id: 3,
    name: 't3',
  },
  {
    id: 4,
    name: 't4',
  },
];
export default class TreatmentInput extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    icon: 'search',
  };

  handleTreatment = e => {
    console.log(111, e);
    this.setState({ icon: 'close ' });
  };

  // handleIcon = () => this.setState({ icon: 'search ' });

  render() {
    const { icon } = this.state;
    return (
      <div className="treatment__input">
        <Select
          showSearch
          placeholder="Search hair and beauty"
          style={{ width: '100%' }}
          optionFilterProp="children"
          suffixIcon={
            icon === 'search' ? <Icon type="search" /> : <Icon type="close" />
          }
          onChange={this.handleTreatment}
          // onSelect={this.handleIcon}
        >
          {treatments.map(treatment => {
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
