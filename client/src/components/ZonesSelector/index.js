import React, { Component } from 'react';
import { Select, Input, Button, Icon } from 'antd';
import uniqueId from 'uuid/dist/v1';

// each zone from to price
import './style.css';

const londonZones = {
  '1': 'zone1',
  '2': 'zone2',
  '3': 'zone3',
  '4': 'zone4',
  '5': 'zone5',
  '6': 'zone6',
  '7': 'zone7',
  '8': 'zone8',
  '9': 'zone9',
};

class ZonesSelector extends Component {
  state = {
    zones: [],
  };

  componentDidMount() {
    const { zones } = this.props;
    this.setState({ zones });
  }

  componentDidUpdate(prevProps) {
    const { zones } = this.props;
    if (prevProps.zones !== zones) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ zones });
    }
  }

  handleFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  handleSelect = (value, option) => {
    const { name } = option.props;
    const [selectId, selectType] = name.split('_');
    const { zones } = this.state;

    const newZones = zones.map(z => {
      if (String(z.salon_zone_id) === selectId) {
        if (selectType === 'to') {
          return {
            ...z,
            to_zone: value,
          };
        }
        if (selectType === 'from') {
          return { ...z, from_zone: value };
        }
      }
      return z;
    });
    this.setState({ zones: newZones });
  };

  handlePriceChange = e => {
    const { name, value } = e.target;
    const { zones } = this.state;

    const newZones = zones.map(z => {
      if (String(z.salon_zone_id) === name) {
        return { ...z, price: value };
      }
      return z;
    });
    this.setState({ zones: newZones });
  };

  handleDelete = id => {
    const { zones } = this.state;
    // eslint-disable-next-line
    const newZones = zones.filter(z => z.salon_zone_id !== id);
    this.setState({ zones: newZones });
  };

  handleAddMore = () => {
    const { zones } = this.state;
    const newZones = [...zones];
    newZones.push({ salon_zone_id: uniqueId() });
    this.setState({ zones: newZones });
  };

  render() {
    const {
      label = 'If a Mobile Hairstylist/Beautician, what London Zones do you cover?',
      className,
    } = this.props;
    const { zones } = this.state;
    return (
      <div className={`zone-selector__zones ${className}`}>
        <p>{label}</p>
        {zones.map(zone => (
          <div className="zone-selector__item" key={zone.salon_zone_id}>
            {window.innerWidth < 600 && (
              <Icon
                className="zone-seletor__delete"
                type="close-circle"
                theme="twoTone"
                twoToneColor="#d11a2a"
                onClick={() => {
                  this.handleDelete(zone.salon_zone_id);
                }}
              />
            )}
            <div
              className="zone-selector__select-wrapper"
              key={zone.salon_zone_id}
            >
              <Select
                className="zone-selector"
                size={window.innerWidth > 450 ? 'default' : 'small'}
                name="far"
                showSearch
                placeholder="From"
                defaultValue={londonZones[zone.from_zone]}
                optionFilterProp="children"
                filterOption={this.handleFilter}
                onSelect={this.handleSelect}
              >
                {Object.entries(londonZones).map(([key, value]) => (
                  <Select.Option
                    key={uniqueId()}
                    value={key}
                    name={`${zone.salon_zone_id}_from`}
                  >
                    {value}
                  </Select.Option>
                ))}
              </Select>
              <Select
                className="zone-selector"
                size={window.innerWidth > 450 ? 'default' : 'small'}
                showSearch
                placeholder="To"
                optionFilterProp="children"
                filterOption={this.handleFilter}
                defaultValue={londonZones[zone.to_zone]}
                onSelect={this.handleSelect}
              >
                {Object.entries(londonZones).map(([key, value]) => (
                  <Select.Option
                    key={uniqueId()}
                    value={key}
                    name={`${zone.salon_zone_id || zone.id}_to`}
                  >
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Input
              className="zone-selector__price"
              min={0}
              max={12121212}
              name={zone.salon_zone_id}
              size={window.innerWidth > 450 ? 'default' : 'small'}
              defaultValue={zone.price}
              placeholder="price"
              onChange={this.handlePriceChange}
            />
            <div className="zone-selector__btns-wrapper">
              {window.innerWidth > 600 && (
                <Button
                  className="zone-selector__btn"
                  type="danger"
                  size={window.innerWidth > 450 ? 'default' : 'small'}
                  onClick={() => {
                    this.handleDelete(zone.salon_zone_id);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button type="primary" onClick={this.handleAddMore}>
          + Add More
        </Button>
      </div>
    );
  }
}

export default ZonesSelector;
