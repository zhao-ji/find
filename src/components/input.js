import React, { Fragment } from 'react';

import { 
    Button,
    Form,
    InputGroup,
} from 'react-bootstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FindInput = ({ filters, onInputChange, onDeleteMethod, type, helpText }) => {
    return (
        filters.includes(type) &&
        <Fragment>
            <span className="d-block font-light-weight font-italic small">
                {helpText}
            </span>
            <InputGroup className="shadow-sm">
                <Form.Control
                    type="text" size="lg"
                    onChange={event => onInputChange(event, type)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary"> 
                        <FontAwesomeIcon
                            icon={faTrash} size="lg" className="float-right"
                            onClick={() => onDeleteMethod(type)}
                        />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Fragment>
    );
}

export default FindInput;
