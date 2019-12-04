import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Skeleton, message } from 'antd';

import { fetchLocationList as fetchLocationListAction } from './location.actions';
import searchChangeAction from '../search.actions';

const { Option } = Select;

class LocationInput extends Component {
  handleSearch = value => {
    const { fetchLocationList } = this.props;
    if (value.length > 3) {
      fetchLocationList(value);
    }
  };

  handleSelect = value => {
    const {
      locations: { locationList },
      searchChange,
    } = this.props;
    const selectedLocation = locationList.reduce((location, locationObj) => {
      if (locationObj.place_id === value) {
        return locationObj;
      }
      return location;
    }, {});

    searchChange({
      name: 'location',
      value: selectedLocation,
    });
  };

  render() {
    const {
      locations: { locationList, error, loading },
    } = this.props;
    this.match = locationList.length;

    if (error) {
      message.error();
    }
    return (
      <>
        {error && message.error(error)}
        <Select
          allowClear
          showSearch
          suffixIcon={<Icon type="environment" />}
          onSearch={this.handleSearch}
          onChange={this.handleSelect}
          filterOption="children"
          dropdownRender={menu => {
            if (loading) return <Skeleton active paragraph={{ rows: 0 }} />;
            return <>{menu}</>;
          }}
          notFoundContent="No location match"
        >
          {locationList.map(address => (
            <Option key={address.place_id} value={address.place_id}>
              {address.display_name}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

const mapStateToProps = ({ locations, searchQueries: { location } }) => ({
  locations,
  location,
});

export default connect(mapStateToProps, {
  fetchLocationList: fetchLocationListAction,
  searchChange: searchChangeAction,
})(LocationInput);
