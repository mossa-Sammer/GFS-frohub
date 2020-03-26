import React from 'react';
import { SearchForm } from '../../components';

import './style.css';

function Home() {
  return (
    <div className="home__page-container">
      <SearchForm status="homePage" />
    </div>
  );
}

export default Home;
