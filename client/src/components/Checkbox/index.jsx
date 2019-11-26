import React from 'react';
import { Checkbox } from 'antd';

import './index.css';

export default function SharedCheckBox(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Checkbox {...props} className="check-box" />;
}
