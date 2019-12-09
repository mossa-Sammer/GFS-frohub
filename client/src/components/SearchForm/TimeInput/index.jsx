import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Button, DatePicker, Icon } from 'antd';

import moment from 'moment';
import TimePicker from './TimePicker';
import searchAction from '../search.actions';

import './style.css';

const { Panel } = Collapse;
class TimeInput extends Component {
  handleDate = e => {
    const { searchAction: handleSearch } = this.props;
    const { _isAMomentObject } = e;
    if (_isAMomentObject) {
      const convertedDate = moment(e).format('YYYY-MM-DD');
      handleSearch({
        name: 'date',
        value: convertedDate,
      });
    } else {
      handleSearch({
        name: 'date',
        value: '',
      });
    }
  };

  render() {
    const { date, from, to } = this.props;
    return (
      <Collapse
        accordion
        expandIcon={() => <Icon className="picker-icon" type="calendar" />}
      >
        <Panel
          className="time-box"
          header={`${date ? `${moment(date).format('MM/DD')}` : 'Any Date'} ${
            from && to ? `${from.split(' ')[0]} - ${to.split(' ')[0]}` : ''
          }`}
        >
          <div className="timing_container">
            <div>
              <Icon className="picker-icon date-icon" type="calendar" />
              <span className="date-title">Choose Date</span>
              <div className="date__container">
                <Button
                  className={`${!date && 'date__active'} timing-btn `}
                  onClick={this.handleDate}
                >
                  Any Date
                </Button>
                <DatePicker
                  allowClear={false}
                  className={`${date &&
                    'active'} timing-btn picker choose__date-btn`}
                  onChange={this.handleDate}
                  placeholder="Choose Date"
                  dropdownClassName="calendar"
                />
              </div>
            </div>
            <TimePicker />
          </div>
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  const { date, time } = state.searchQueries;
  const { from, to } = time;
  return {
    date,
    from,
    to,
  };
};

export default connect(mapStateToProps, { searchAction })(TimeInput);
