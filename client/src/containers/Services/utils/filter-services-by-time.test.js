import { withTimeServices } from './mockupServices/mockup-services-with-time';

import { filteredWithSpecificTime } from './mockupServices/filtred-data-with-spec-time';

import { filterServices } from './index';

it('Filter services by date only', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '05:00',
      to: '20:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(withTimeServices.length - 1);
});

it('Filter services with specific time from 04:00 to 08:00', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '04:00',
      to: '08:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(filteredWithSpecificTime.length);
});

it('Filter services with non-available time', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '02:00',
      to: '03:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(0);
});

it('Filter services with non-available time', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '22:00',
      to: '22:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(0);
});

it('Filter services with non-available time', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '04:00',
      to: '04:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(0);
});

it('Filter services with non-available time', () => {
  const searchQueries = {
    treatment: '',
    location: null,
    date: null,
    time: {
      from: '23:00',
      to: '24:00',
    },
  };
  const filteredServices = filterServices(withTimeServices, searchQueries);
  expect(filteredServices).toHaveLength(0);
});
