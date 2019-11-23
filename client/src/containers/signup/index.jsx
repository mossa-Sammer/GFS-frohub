import React from 'react';
import SignupForm from './form';
import Link from '../../components/Link';

export default function Signup() {
  return (
    <div>
      <h1>Create your account</h1>
      <div>
        <SignupForm />
      </div>
      <Link href="/">
        <span>
          By signing up, you agree to our Terms, Privacy Policy and Cookie use &
          Conditions
        </span>
      </Link>
    </div>
  );
}
