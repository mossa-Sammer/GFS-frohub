import React from 'react';

import './style.css';
import './media.css';

export default function WelcomeStylist() {
  return (
    <div className="welcome__stylist-container">
      <div className="welcome__stylist-heading">
        <h1>Welcome</h1>
      </div>
      <div className="welcome__stylist-text">
        <h3>
          We&apos;re super excited and thrilled to have you join the FroHub
          Community!
        </h3>
      </div>
      <div className="partner__dashboard-text">
        <p>
          If you require any support please contact us at partner@frohub.com.
        </p>
      </div>
    </div>
  );
}
