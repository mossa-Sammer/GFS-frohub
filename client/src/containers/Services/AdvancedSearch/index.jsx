import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Icon, Button } from 'antd';

import advancedSearchAction from './advancedSearch.actions';

import './style.css';

class AdvancedSearch extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    visible: false,
  };

  handleVisibleSelect = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  handleSortRated = e => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ value: e.target.value, key: 'sortByRate' });
  };

  sortByType = e => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ value: e.target.value, key: 'sortByType' });
  };

  clearSort = () => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ key: 'clear' });
  };

  render() {
    const { visible } = this.state;
    const { advancedSearchQueries } = this.props;
    return (
      <div className="filter__container">
        {visible && (
          <div className="filter__menu">
            <div className="filter__menu-options">
              <span className="filter-tilte">Sort by:</span>
              <div>
                <Radio.Group
                  onChange={this.handleSortRated}
                  value={advancedSearchQueries.byRate}
                >
                  <div className="filter_option">
                    <Radio value="highestRate">Highest Rate</Radio>
                  </div>
                  <div className="filter_option">
                    <Radio value="highestPrice">Highest Price</Radio>
                  </div>
                  <div className="filter_option">
                    <Radio value="lowestPrice">Lowest Price</Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>
            <div className="filter__menu-options">
              <span className="filter-tilte">Service type:</span>
              <div>
                <Radio.Group
                  onChange={this.sortByType}
                  value={advancedSearchQueries.byService}
                >
                  <div className="filter_option">
                    <Radio value="mobile">Mobile Beauty</Radio>
                  </div>
                  <div className="filter_option">
                    <Radio value="home">Home Based</Radio>
                  </div>
                  <div className="filter_option">
                    <Radio value="salon">Salon Based</Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>
            <div className="filter__menu-btns">
              <Button className="clear-btn" onClick={this.clearSort}>
                Clear filters
              </Button>
              <Button className="show-btn">Show results</Button>
            </div>
          </div>
        )}
        <Button className="filter-btn" onClick={this.handleVisibleSelect}>
          <Icon type="swap" />
          Filter and sort
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    advancedSearchQueries: state.advancedSearchQueries,
  };
};

export default connect(mapStateToProps, { advancedSearchAction })(
  AdvancedSearch
);
