import React, { Component, Fragment } from 'react';
import { 
    Button,
    Container,
    Form,
    InputGroup,
} from 'react-bootstrap';

import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

//import Find from './components/find';

class App extends Component {
    state = {
        filters: [],
        meansContent: null,
        results: null,
        isLoading: false,
    }

    onChange = (event) => {
        switch(event.target.value) {
            case "means":
                this.setState(prevState => ({ filters: prevState.filters.concat("means") }));
                break;
            default:
                break;
        }
    }

    onDeleteMethod = (method) => {
        switch(method) {
            case "means":
                this.setState(prevState => ({ filters: prevState.filters.filter(i => i !== "means") }));
                break;
            default:
                break;
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            meansContent: event.target.value,
        });
    }

    onSubmit = () => {
        this.setState({ isLoading: true });
        let args = {
            params: {
                max: 20,
                ml: this.state.meansContent,
            }
        };
        axios
            .get("https://api.datamuse.com/words", args)
            .then(response => {
                const results = response.data;
                this.setState({ results, isLoading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ isLoading: false });
            })
    }

    render() {
        const {filters, isLoading, results } = this.state;
        return (
            <Container>
                <InputGroup className="shadow">
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary"> En/汉 </Button>
                    </InputGroup.Prepend>
                    <Form.Control as="select" defaultValue="" onChange={this.onChange}>
                        <option disabled="disabled" value="">查找单词</option>
                        {!filters.includes("means") && <option value="means">意思相似</option>}
                        <option>发音相似</option>
                        <option>拼写相似</option>
                    </Form.Control>
                </InputGroup>
                <br/>
                {filters.includes("means") &&
                        <Fragment>
                            <span className="d-block font-light-weight font-italic small">
                                根据单词的含义来查找，例如使用 "ringng in the ears" 来查找 "earing"
                            </span>
                            <InputGroup className="shadow-sm">
                                <Form.Control type="text" size="lg" onChange={this.onInputChange}/>
                                <InputGroup.Append>
                                    <Button variant="outline-secondary"> 
                                        <FontAwesomeIcon
                                            icon={faTrash} size="lg" className="float-right"
                                            onClick={() => this.onDeleteMethod("means")}
                                        />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Fragment>
                }
                <br/>
                {filters.length > 0 &&
                        <Button variant="outline-info" size="lg" block onClick={this.onSubmit}>
                            查找
                        </Button>
                }
                <br/>
                {isLoading &&
                        <FontAwesomeIcon icon={faSpinner} spin className="mx-auto"/>
                }
                {!isLoading && results &&
                        results.map((i, index) => (
                            <div key={index}>
                                <meter min="0" max="100000" value={i.score}></meter>
                                {i.word}
                            </div>
                        ))
                }
            </Container>
        );
    }
}

export default App;
