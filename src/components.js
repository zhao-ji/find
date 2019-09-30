import React, { Component, Fragment } from 'react';

import { 
    ButtonGroup,
    Button,
    Form,
    InputGroup,
    Card,
} from 'react-bootstrap';

import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FindInput = ({ filters, onInputChange, onDeleteMethod, onKeyDown, type, helpText }) => {
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
                    onKeyDown={onKeyDown}
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

class ResultCard extends Component {
    onCopy = word => {
        // var dummy = document.createElement("input");
        // document.body.appendChild(dummy);
        // dummy.setAttribute('value', word);
        // dummy.select();
        // document.execCommand('copy');
    }

    render() {
        const { score, word } = this.props.result;
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <meter min="0" max="100000" value={score}></meter>
                        <span className="ml-3"> {word} </span>
                        <ButtonGroup className="float-right" size="sm">
                            <Button variant="light" onClick={() => this.onCopy(word)}>
                                <FontAwesomeIcon icon={faClipboard} />
                            </Button>
                            <Button
                                href={`https://www.lexico.com/en/definition/${word}`}
                                target="_blank" variant="light">
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </Button>
                        </ButtonGroup>
                    </Card.Title>
                </Card.Body>
            </Card>
        );
    }
}

export default {
    FindInput: FindInput,
    ResultCard: ResultCard,
};
