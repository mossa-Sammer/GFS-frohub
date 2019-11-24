import React from 'react';
import SignupForm from './form';
import Link from '../../components/Link';

export default function Signup() {
  return (
    <div className="signup__page">
      <div className="signup__container">
        <h1 className="signup__title">Create your account</h1>
        <div>
          <SignupForm />
        </div>
        <span>By signing up, you agree to our Terms, </span>
        <Link href="/">
          <span>Privacy Policy and Cookie use & Conditions</span>
        </Link>
        <p>
          Already have an Account?{' '}
          <Link href="/login">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
