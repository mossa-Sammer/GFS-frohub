import React from 'react';
import { Input } from 'antd';

import './index.css';

export default function SharedInput(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Input {...props} className="input" />;
}
