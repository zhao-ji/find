import React, { Component } from 'react';
import { 
    Button,
    Form,
    InputGroup,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

import Components from './components';

class App extends Component {
    state = {
        filters: [],

        means: null,
        sounds: null,
        spelled: null,
        topics: null,
        rightContext: null,
        leftContext: null,
        antonyms: null,

        isLoading: false,
        results: null,
    }

    onChange = event => {
        const value = event.target.value;
        this.setState(prevState => ({
            filters: prevState.filters.concat(value),
        }));
    }

    onDeleteMethod = method => {
        this.setState(prevState => ({ 
            filters: prevState.filters.filter(i => i !== method),
            [method]: null,
        }));
    }

    onInputChange = (event, type="") => {
        const value = event.target.value;
        this.setState({ [type]: value });
    }

    onSubmit = () => {
        this.setState({ isLoading: true });
        let params = {
            max: 18,
        };
        if (this.state.means) {
            params["ml"] = this.state.means;
        }
        if (this.state.sounds) {
            params["sl"] = this.state.sounds;
        }
        if (this.state.spelled) {
            params["sp"] = this.state.spelled;
        }
        if (this.state.topics) {
            params["topics"] = this.state.topics;
        }
        if (this.state.rightContext) {
            params["rc"] = this.state.rightContext;
        }
        if (this.state.leftContext) {
            params["lc"] = this.state.leftContext;
        }
        if (this.state.antonyms) {
            params["rel_ant"] = this.state.antonyms;
        }
        let args = {
            params: params,
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
                        <option value="">查找单词</option>
                        {!filters.includes("means") && <option value="means">意思相似</option>}
                        {!filters.includes("sounds") && <option value="sounds">发音相似</option>}
                        {!filters.includes("spelled") && <option value="spelled">拼写相似</option>}
                        {!filters.includes("topics") && <option value="topics">单词分类</option>}
                        {!filters.includes("rightContext")
                                && <option value="rightContext"> 经常出现在后面的单词 </option>}
                        {!filters.includes("leftContext")
                                && <option value="leftContext"> 经常出现在前面的单词 </option>}
                        {!filters.includes("antonyms") && <option value="antonyms">反义词</option>}
                    </Form.Control>
                </InputGroup>
                <br/>
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="means"
                    helpText='根据单词的含义来查找，例如使用 "ringng in the ears" 来查找 "earing"'
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="sounds"
                    helpText=' 根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant" '
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="spelled"
                    helpText='根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符'
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="topics"
                    helpText='根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔'
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="leftContext"
                    helpText='如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"'
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="rightContext"
                    helpText='如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"'
                />
                <Components.FindInput 
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    type="antonyms"
                    helpText='如果想查找 "good", 用反义词来查找，例如 "bad"'
                />
                <br/>
                {filters.length > 0 &&
                    <Button variant="outline-info" size="lg" block onClick={this.onSubmit}>
                        查找
                    </Button>
                }
                <br/>
                {isLoading &&
                    <Row>
                        <Col lg={{span: 2, offset: 5}} md={{span: 2, offset: 5}}>
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="mx-auto" />
                        </Col>
                    </Row>
                }
                <Row>
                    {!isLoading && results && results.map((result, index) => (
                        <Col key={index} lg={4} md={6} sm={12} className="my-1">
                            <Components.ResultCard result={result} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default App;
