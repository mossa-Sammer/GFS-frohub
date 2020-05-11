/* eslint-disable no-return-assign, no-nested-ternary */
import React, { Component } from 'react';

import { Table } from 'antd';

import moment from 'moment';

import { getFinance } from '../api';

export default class Finance extends Component {
  state = {
    hasFinance: false,
    stylistFinance: [],
    totalDeposited: 0,
  };

  async componentDidMount() {
    const { hasFinance, stylistFinance } = await getFinance(2);
    if (hasFinance) {
      let { totalDeposited } = this.state;
      await stylistFinance.map(
        finance => (totalDeposited += finance.collected_deposit)
      );
      this.setState({ stylistFinance, hasFinance, totalDeposited });
    }
  }

  render() {
    const { stylistFinance, hasFinance, totalDeposited } = this.state;
    const columns = [
      {
        title: 'Jobs done',
        dataIndex: 'salon_service_id',
        key: 'salon_service_id',
      },
      {
        title: 'Deposit collected',
        dataIndex: 'collected_deposit',
        key: 'collected_deposit',
      },
    ];
    return (
      <div>
        <h4>Total Earning through FroHub</h4>
        <span>€ {totalDeposited}</span>
        {hasFinance ? (
          stylistFinance.length ? (
            stylistFinance.map(finance => {
              return (
                <div key={finance.salon_service_id}>
                  <div>
                    <span>
                      {
                        moment(finance.done)
                          .format('MMMM/YYYY')
                          .split('/')[0]
                      }
                      &nbsp;
                      {
                        moment(finance.done)
                          .format('MMMM/YYYY')
                          .split('/')[1]
                      }
                    </span>
                    <span>{finance.collected_deposit}</span>
                  </div>
                  <Table
                    dataSource={[finance]}
                    columns={columns}
                    pagination={false}
                  />
                </div>
              );
            })
          ) : (
            <>loading</>
          )
        ) : (
          <>No Finance </>
        )}
      </div>
    );
  }
}
