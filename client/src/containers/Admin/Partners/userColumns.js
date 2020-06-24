/* eslint-disable no-nested-ternary */
import React from 'react';
import { Divider, Tag, Button } from 'antd';

import { Link } from 'react-router-dom';

import TableActions from './TableActions';

import { ADMIN_PERSONAL, ADMIN_EDIT_URL } from '../../../routes_urls';

const userColumns = [
  {
    title: 'Name',
    key: 'name',
    render: text => {
      return <span>{text.fullname}</span>;
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    render: record => {
      const { role } = record;
      const color =
        role === 'admin'
          ? 'green'
          : role === 'stylist'
          ? 'geekblue'
          : 'volcano';
      return (
        <Tag key={Math.random()} color={color}>
          {role.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    key: 'action',
    render: record => (
      <>
        {record.role === 'stylist' ? (
          <TableActions user={record} />
        ) : (
          <>
            <Button className="admin__action-btn">
              <Link to={ADMIN_PERSONAL}>View</Link>
            </Button>
            <Divider type="vertical" />
            <Button className="stylist__action-btn">
              <Link to={ADMIN_EDIT_URL}>Edit</Link>
            </Button>
          </>
        )}
      </>
    ),
  },
];
export default userColumns;
