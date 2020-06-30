import React from 'react';

import './style.css';

export default function Dashboard() {
  return (
    <div className="admin__dashboard-container">
      <div>
        <img
          className="dashboard__logo"
          src="https://s3-eu-west-2.amazonaws.com/frohub-content/wp-content/uploads/2019/10/22155814/frohub_landscape_e05747ff_transparent_300dpi.png"
          alt="logo"
        />
      </div>
      <h2>FroHub Partners</h2>
    </div>
  );
}
