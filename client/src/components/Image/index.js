import React from 'react';
import { Modal, Icon, Button, Card } from 'antd';
import './style.css';

const Image = ({ src, name, visible, onClick, handleDelete, onCancel }) => {
  return (
    <>
      {/* <button className="image__container" type="button" name={name}> */}
      <div className="image__container__warapper">
        <div className="image-wrapper">
          <img
            className="image__container__image"
            src={src}
            name={name}
            alt="uploaded"
            onClick={onClick}
          />
          <button className="remove-image">&#215;</button>
        </div>

        <Button
          type="danger"
          className="image__container__delete-btn"
          name={name}
          onClick={handleDelete}
        >
          <Icon type="delete" />
        </Button>
        {/* </button> */}
      </div>
      <Modal width={1000} visible={visible} footer={null} onCancel={onCancel}>
        <img
          src={src}
          alt="uploaded"
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>
      {/* </button> */}
    </>
  );
};
export default Image;
