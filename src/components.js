import React, { Component, Fragment } from 'react';

import {
    ButtonGroup,
    Button,
    Card,
    Form,
    InputGroup,
    Row,
    Col,
} from 'react-bootstrap';

import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FindInput extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    onHelpTextClick = () => {
        this.textInput.current.focus();
        this.textInput.current.select();
    }

    render() {
        const { filters, onInputChange, onDeleteMethod, onKeyDown, type, helpText } = this.props;
        if(!filters.includes(type)){
            return false;
        }
        return (
            <Fragment>
                <span
                    onClick={this.onHelpTextClick}
                    className="d-block font-light-weight font-italic small">
                    {helpText}
                </span>
                <InputGroup className="shadow-sm">
                    <Form.Control
                        type="text" size="lg"
                        ref={this.textInput}
                        onChange={event => onInputChange(event, type)}
                        onKeyDown={onKeyDown}
                        onFocus={event => event.target.select()}
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
                    <span style={{ fontSize: "1.5em" }}> {word} </span>
                    <Row>
                        <Col lg="8" xs="8">
                            <meter min="0" max="100000" low="10000" value={score}></meter>
                        </Col>
                        <Col lg="4" xs="4">
                            <ButtonGroup className="float-right" size="sm">
                                <Button variant="light" onClick={() => this.onCopy(word)}>
                                    <FontAwesomeIcon icon={faClipboard} />
                                </Button>
                                <Button href={`https://www.lexico.com/en/definition/${word}`} target="_blank" variant="light">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

const Comment = ({ children }) => {
  return false;
};

export default {
    FindInput: FindInput,
    ResultCard: ResultCard,
    Comment: Comment,
};
