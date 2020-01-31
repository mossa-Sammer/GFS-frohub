import React from 'react';

import SearchForm from '../../components/SearchForm';

export default function Layout(props) {
  const { children, status } = props;
  return (
    <div>
      <SearchForm status={status} />
      {children}
    </div>
  );
}
