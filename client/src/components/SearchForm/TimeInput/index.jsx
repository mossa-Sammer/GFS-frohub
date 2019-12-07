import React, { Component } from 'react';
import {
  Collapse,
  Button,
  DatePicker,
  Icon,
  Popover,
  TimePicker,
  Form,
} from 'antd';

import moment from 'moment';

import './style.css';

const { Panel } = Collapse;
export default class TimeInput extends Component {
  // handleAnyTime = () => this.setState({ selectedValue: 'Any Date' });

  // handleDate = selectedDate => {
  //   const { pickerOpen } = this.state;
  //   const convertedDate = moment(selectedDate).format('YYYY-MM-DD');
  //   this.setState({
  //     selectedValue: convertedDate,
  //     pickerOpen: !pickerOpen,
  //   });
  // };

  // handleFromTime = selectedFromTime => {
  //   const convertedTime = moment(selectedFromTime).format('LT');
  //   this.setState({ fromTime: convertedTime });
  // };

  // handleToTime = selectedToTime => {
  //   const convertedTime = moment(selectedToTime).format('LT');
  //   this.setState({ toTime: convertedTime });
  // };

  // handleSearch = () => console.log(this.state);

  // eslint-disable-next-line react/state-in-constructor
  state = {
    pickerOpen: false,
    dateTime: {
      date: '',
      time: {
        from: '',
        to: '',
      },
    },
  };

  handleOpenPicker = () => this.setState({ pickerOpen: true });

  handleDate = e => {
    const { _isAMomentObject } = e;
    if (_isAMomentObject) {
      const convertedDate = moment(e).format('YYYY-MM-DD');
      this.setState({ dateTime: { date: convertedDate } });
    } else {
      this.setState({ dateTime: { date: '' } });
    }
  };

  handleFromTime = selectedFromTime => {
    const convertedTime = moment(selectedFromTime).format('LT');
    this.setState({ fromTime: convertedTime });
  };

  handleToTime = selectedToTime => {
    const convertedTime = moment(selectedToTime).format('LT');
    this.setState({ toTime: convertedTime });
  };

  handleTime = e => {
    // console.log(e);
    const { _isAMomentObject } = e;
    if (!_isAMomentObject) {
      this.setState(prevState => {
        return {
          ...prevState,
          // change from and to to empty values from: '', to: ''
        };
      });
    } else {
      // this.setState(prevState => {
      //   // const { dateTime } = prevState;
      //   // const { from, to } = dateTime;
      //   return {
      //     ...prevState,
      //     dateTime: {
      //       from: '',
      //       to: '',
      //     },
      //   };
      // });
      // this.setState({dateTime: time: {from:' ', to: ''}})
    }
  };

  render() {
    // console.log('Render');
    // const { pickerOpen, selectedValue, fromTime, toTime } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { pickerOpen, dateTime } = this.state;
    // console.log(4444444, dateTime);
    return (
      <Collapse accordion expandIcon={() => <Icon type="calendar" />}>
        <Panel
        // header={
        //   fromTime && toTime ? `${fromTime} - ${toTime}` : selectedValue
        // }
        >
          <div className="timing_container">
            <div>
              <span>Choose Date</span>
              <div className="date__container">
                {/* <Button className="timing__btn" onClick={this.handleAnyTime}> */}
                <Button className="timing__btn" onClick={this.handleDate}>
                  Any Date
                </Button>
                <Popover
                  placement="rightTop"
                  content={
                    pickerOpen && <DatePicker onChange={this.handleDate} />
                    // <DatePicker onChange={this.handleDate} />
                  }
                  trigger="click"
                >
                  <Button
                    className="timing__btn"
                    onClick={this.handleOpenPicker}
                  >
                    Choose Date
                  </Button>
                </Popover>
              </div>
            </div>
            <div>
              <span>Choose Time</span>
              <div className="time__container">
                {/* <Button className="timing__btn" onClick={this.handleAnyTime}> */}
                <Button className="timing__btn" onClick={this.handleTime}>
                  Any Time
                </Button>
                <Popover
                  className="time__popover"
                  placement="bottom"
                  content={
                    <Form className="time__duration-box" layout="inline">
                      <Form.Item className="timing__form-item" label="From">
                        <TimePicker
                          defaultValue={moment('12:00', 'HH:mm')}
                          format="HH:mm"
                          onChange={this.handleFromTime}
                          // onChange={this.handleTime}
                        />
                      </Form.Item>
                      <Form.Item className="timing__form-item" label="To">
                        <TimePicker
                          defaultValue={moment('12:00', 'HH:mm')}
                          format="HH:mm"
                          onChange={this.handleToTime}
                          // onChange={this.handleTime}
                        />
                      </Form.Item>
                    </Form>
                  }
                  trigger="click"
                >
                  <Button
                    className="timing__btn"
                    onClick={this.handleOpenPicker}
                  >
                    Choose Time
                  </Button>
                </Popover>
              </div>
            </div>
          </div>
          {/* <Button onClick={this.handleSearch}>Done</Button> */}
        </Panel>
      </Collapse>
    );
  }
}
