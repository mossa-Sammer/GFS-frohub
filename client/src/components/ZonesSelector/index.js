import React from 'react';
import { Select, InputNumber, Button } from 'antd';
import uniqueId from 'uuid/dist/v4';
// each zone from to price
import './style.css';

const ZonesSelector = ({
  zones,
  label = 'which london zones are you covering?',
  // handleSave,
  handleAddMore,
}) => {
  const londonZones = {
    '1': 'zone 1',
    '2': 'zone 2',
    '3': 'zone 3',
    '4': 'zone 4',
    '5': 'zone 5',
    '6': 'zone 6',
    '7': 'zone 7',
    '8': 'zone 8',
    '9': 'zone 9',
  };

  const handleFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div className="zone-selector__zones">
      <p>{label}</p>
      {zones.map(zone => (
        <div key={uniqueId()} className="zone-selector__item" disabled>
          <div className="zone-selector__select-wrapper">
            <Select
              className="zone-selector"
              size={window.innerWidth > 450 ? 'default' : 'small'}
              name="fromZone"
              showSearch
              placeholder="From"
              defaultValue={zone.from}
              optionFilterProp="children"
              filterOption={handleFilter}
            >
              {Object.entries(londonZones).map(([key, value]) => (
                <Select.Option key={uniqueId()} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
            <Select
              className="zone-selector"
              size={window.innerWidth > 450 ? 'default' : 'small'}
              name="toZone"
              showSearch
              placeholder="To"
              defaultValue={zone.to}
              optionFilterProp="children"
              filterOption={handleFilter}
            >
              {Object.entries(londonZones).map(([key, value]) => (
                <Select.Option key={uniqueId()} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </div>
          <InputNumber
            className="zone-selector__price"
            size={window.innerWidth > 450 ? 'default' : 'small'}
            formatter={value =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            // onChange={onChange}
            // value={zone.price}
            placeholder="price"
          />
          <div className="zone-selector__btns-wrapper">
            {/* <Button
              type="primary"
              className="zone-selector__btn"
              size={window.innerWidth > 450 ? 'default' : 'small'}
            >
              Save
            </Button> */}
            <Button
              type="danger"
              className="zone-selector__btn"
              size={window.innerWidth > 450 ? 'default' : 'small'}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Button type="primary" onClick={handleAddMore}>
        + Add more
      </Button>
    </div>
  );
};

export default ZonesSelector;
