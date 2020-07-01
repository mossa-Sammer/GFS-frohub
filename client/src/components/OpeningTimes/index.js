import React from 'react';
import { TimePicker, Button, Icon } from 'antd';
import uniqueId from 'uuid/dist/v1';

import moment from 'moment';
import DaySelect from '../DaySelect';

import './style.css';

class OpeningTimes extends React.Component {
  state = {
    times: [],
  };

  componentDidUpdate(prevProps) {
    const { times } = this.props;
    if (prevProps.times !== times) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ times });
    }
  }

  handleAdd = () => {
    const { times } = this.state;
    const newTimes = [...times];
    newTimes.push({ salon_opening_time_id: uniqueId() });
    this.setState({ times: newTimes });
  };

  handleTime = (timeString, id, type) => {
    const { times } = this.state;
    times.map(t => {
      if (t.salon_opening_time_id === id) {
        if (type === 'from') t.from_time = timeString;
        else t.to_time = timeString;
        return t;
      }
      return t;
    });
  };

  handleDayChange = (id, dayNumber) => {
    const { times } = this.state;
    times.map(t => {
      if (t.salon_opening_time_id === id) {
        t.day = dayNumber;
      }
      return t;
    });
  };

  handleDelete = id => {
    const { times } = this.state;
    this.setState({ times: times.filter(t => t.salon_opening_time_id !== id) });
  };

  render() {
    const { times } = this.state;
    if (times.length === 0) {
      times.push({});
    }
    const { className } = this.props;
    const format = 'HH:mm';
    return (
      <div className={`opening-times ${className}`}>
        {times.map(time => (
          <div className="opening-times__item" key={time.salon_opening_time_id}>
            <DaySelect
              className="opening-times__item__day"
              size={window.innerWidth > 600 ? 'default' : 'small'}
              dayIndex={time.day}
              handleDayChange={dayNumber => {
                this.handleDayChange(time.salon_opening_time_id, dayNumber);
              }}
            />
            <div className="opening-times__time-wrapper">
              <TimePicker
                key={time.salon_opening_time_id}
                className="opening-times__item__time"
                defaultValue={moment(time.from_time || '00:00', format)}
                format={format}
                size="small"
                onChange={(momentTime, timeString) =>
                  this.handleTime(
                    timeString,
                    time.salon_opening_time_id,
                    'from'
                  )
                }
              />
              <TimePicker
                className="opening-times__item__time"
                defaultValue={moment(time.to_time || '00:00', format)}
                format={format}
                size="small"
                onChange={(momentTime, timeString) => {
                  this.handleTime(timeString, time.salon_opening_time_id, 'to');
                }}
              />
            </div>
            {window.innerWidth > 600 ? (
              <Button
                type="danger"
                size={window.innerWidth > 450 ? 'default' : 'small'}
                onClick={() => this.handleDelete(time.salon_opening_time_id)}
              >
                Delete
              </Button>
            ) : (
              <Icon
                className="zone-seletor__delete"
                type="close-circle"
                theme="twoTone"
                twoToneColor="#d11a2a"
                onClick={() => {
                  this.handleDelete(time.salon_opening_time_id);
                }}
              />
            )}
          </div>
        ))}
        <Button type="primary" onClick={this.handleAdd}>
          + Add More
        </Button>
      </div>
    );
  }
}

export default OpeningTimes;
