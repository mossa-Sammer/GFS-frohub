import React from 'react';
import { withRouter } from 'react-router-dom';

import image from '../../assets/images/pageNotFound.svg';
import { Button } from '../../components';
import './style.css';

function PageNotFound(props) {
  const { history } = props;
  return (
    <div className="pageNotFound__container">
      <img src={image} alt="page not found" className="pageNotFound__img" />
      <div className="goback_btn">
        <Button onClick={() => history.goBack()}>Go Back</Button>
      </div>
    </div>
  );
}

export default withRouter(PageNotFound);
