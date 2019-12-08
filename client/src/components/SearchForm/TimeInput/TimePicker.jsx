import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popover, TimePicker, Form } from 'antd';
import moment from 'moment';

import searchAction from '../search.actions';

class TimePickerCom extends Component {
  handleTime = () => {
    const { searchAction: handleSearch } = this.props;
    handleSearch({
      name: 'time',
      value: '',
    });
  };

  handleFromTime = selectedFromTime => {
    const convertedTime = selectedFromTime
      ? moment(selectedFromTime).format('LT')
      : '';
    const { searchAction: handleSearch } = this.props;
    handleSearch({
      name: 'time',
      value: {
        from: convertedTime,
        to: '',
      },
    });
  };

  handleToTime = selectedToTime => {
    const { time } = this.props;
    const { from } = time;
    const convertedTime = selectedToTime
      ? moment(selectedToTime).format('LT')
      : '';
    const { searchAction: handleSearch } = this.props;
    handleSearch({
      name: 'time',
      value: {
        from,
        to: convertedTime,
      },
    });
  };

  render() {
    const { time } = this.props;
    return (
      <div className="time">
        <span>Choose Time</span>
        <div className="time__container">
          <Button className="timing-btn" onClick={this.handleTime}>
            Any Time
          </Button>
          <Popover
            className="time__popover"
            placement="bottom"
            content={
              <Form className="time__duration-box" layout="inline">
                <Form.Item className="timing__form-item" label="From">
                  <TimePicker format="HH" onChange={this.handleFromTime} />
                </Form.Item>
                <Form.Item className="timing__form-item" label="To">
                  <TimePicker
                    format="HH"
                    onChange={this.handleToTime}
                    disabled={!time.from}
                  />
                </Form.Item>
              </Form>
            }
            trigger="click"
          >
            <Button className="timing-btn" onClick={this.handleOpenPicker}>
              Choose Time
            </Button>
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { time } = state.searchQueries;
  return {
    time,
  };
};

export default connect(mapStateToProps, { searchAction })(TimePickerCom);
