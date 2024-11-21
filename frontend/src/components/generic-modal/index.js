import React from 'react';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';
import {GenericButton} from '../generic-button';
import {ALL_TEXT, images} from '../../common';

export const GenericModal = ({
  show,
  type,
  body,
  grayButton,
  buttonText,
  btnLoader,
  handleClose,
  button2,
  buttonText2,
}) => {
  const modalAspectsHandler = type => {
    switch (type) {
      case 1:
        return {
          image: images.success,
          title: ALL_TEXT.GENERIC_MODAL.SUCCESS,
          color: 'modal-title success-title-color-modal',
        };
      case 2:
        return {
          image: images.error,
          title: ALL_TEXT.GENERIC_MODAL.ERROR,
          color: 'modal-title error-title-color-modal',
        };
      case 3:
        return {
          image: images.alert,
          title: ALL_TEXT.GENERIC_MODAL.ALERT,
          color: 'modal-title alert-title-color-modal',
        };
      default:
        return {
          image: images.success,
          title: ALL_TEXT.GENERIC_MODAL.SUCCESS,
          color: 'modal-title success-title-color-modal',
        };
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {
            <div className="modal-body-generic">
              <img src={modalAspectsHandler(type).image} alt={ALL_TEXT.ICON} />
              <span className={modalAspectsHandler(type).color}>
                {modalAspectsHandler(type).title}
              </span>
              <span className="modal-description">{body}</span>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <div className="footerContainer">
            {
              <GenericButton
                buttonText={buttonText}
                onPress={handleClose}
                grayButton={grayButton}
                loading={btnLoader}
              />
            }
            {button2 && (
              <GenericButton
                buttonText={buttonText2}
                onPress={handleClose}
                customStyle={'gray-button'}
              />
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
