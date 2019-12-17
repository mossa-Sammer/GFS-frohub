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
      const day = moment(e).format('dddd');
      handleSearch({
        name: 'date',
        value: convertedDate,
        day,
      });
    } else {
      handleSearch({
        name: 'date',
        value: '',
        day: '',
      });
    }
  };

  // Can not select days before today
  disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  render() {
    const { date, from, to } = this.props;
    const fromTime = moment(from, 'hh:mm').format('h:mm a');
    const toTime = moment(to, 'hh:mm').format('h:mm a');
    return (
      <Collapse
        accordion
        expandIcon={() => <Icon className="picker-icon" type="calendar" />}
      >
        <Panel
          className="time-box"
          header={`${date ? `${moment(date).format('MM/DD')}` : 'Any Date'} ${
            from && to ? `${fromTime} - ${toTime}` : ''
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
                  disabledDate={this.disabledDate}
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
