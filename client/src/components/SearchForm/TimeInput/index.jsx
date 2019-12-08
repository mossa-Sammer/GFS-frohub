import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Button,
  DatePicker,
  Icon,
  // Popover,
  // TimePicker,
  // Form,
} from 'antd';

import moment from 'moment';
import TimePicker from './TimePicker';
import searchAction from '../search.actions';

import './style.css';

const { Panel } = Collapse;
class TimeInput extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    date: '',
    fromTime: '',
    toTime: '',
  };

  handleDate = e => {
    // console.log(this.props);
    const { searchAction: handleSearch } = this.props;
    const { _isAMomentObject } = e;
    if (_isAMomentObject) {
      const convertedDate = moment(e).format('YYYY-MM-DD');
      // this.setState({ date: convertedDate });
      handleSearch({
        name: 'date',
        value: convertedDate,
      });
    } else {
      // this.setState({ date: '' });
      handleSearch({
        name: 'date',
        value: '',
      });
    }
  };

  render() {
    const { date, from, to } = this.props;

    if (date) {
      console.log(date);
    }
    return (
      <Collapse accordion expandIcon={() => <Icon type="calendar" />}>
        <Panel
          header={`${date ? `${moment(date).format('MM/DD')}` : 'Any Date'} ${
            from && to ? `${from.split(' ')[0]} - ${to.split(' ')[0]}` : ''
          }`}
        >
          <div className="timing_container">
            <div>
              <span>Choose Date</span>
              <div className="date__container">
                <Button className="timing-btn" onClick={this.handleDate}>
                  Any Date
                </Button>
                <DatePicker
                  allowClear={false}
                  className="timing-btn picker"
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
  // console.log(state.searchQueries.date);
  // console.log(1111, state.searchQueries.time.from);
  // console.log(222, state.searchQueries.time.to);
  // console.log(state.searchQueries);
  const { date, time } = state.searchQueries;
  const { from, to } = time;
  return {
    date,
    from,
    to,
  };
};

export default connect(mapStateToProps, { searchAction })(TimeInput);
