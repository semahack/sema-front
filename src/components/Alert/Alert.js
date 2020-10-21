import React from 'react';
import {Alert} from 'react-bootstrap';


const AlertNot = (variant, show) =>{
    return(
        <>
        <Alert variant={variant} show={show}>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        </Alert>
        </>
    );
}

export default AlertNot;