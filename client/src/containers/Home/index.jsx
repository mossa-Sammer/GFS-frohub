import React from 'react';
import Link from '../../components/Link';

import { LOGIN_URL } from '../../routes_urls';

export default function Home(props) {
  const { location } = props;
  return (
    <div>
      Home page
      <Link href={{ pathname: LOGIN_URL, state: { from: location.pathname } }}>
        login
      </Link>
    </div>
  );
}
