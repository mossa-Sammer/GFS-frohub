import React from 'react';
import Link from '../../components/Link';

import { SearchForm } from '../../components';

import { LOGIN_URL } from '../../routes_urls';

import './style.css';

export default function Home() {
  return (
    <div>
      Home page
      <Link href={{ pathname: LOGIN_URL }}>login</Link>
      <SearchForm />
    </div>
  );
}
