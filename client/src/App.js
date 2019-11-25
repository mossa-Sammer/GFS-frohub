import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from './containers/signup';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Router>
        <SignupForm />
      </Router>
    </div>
  );
}

export default App;
