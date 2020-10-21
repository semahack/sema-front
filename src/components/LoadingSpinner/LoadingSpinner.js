import React from 'react';
import {Modal, Spinner} from 'react-bootstrap';
import './LoadingSpinner.css';


const LoadingSpinner = (props) =>{
    return (
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show = {true}
          className='mod'
        >
          <Modal.Body className='mod-content'>
            <Spinner animation="border" role="status">
                
            </Spinner>
          </Modal.Body>
        </Modal>
      );
}

export default LoadingSpinner;