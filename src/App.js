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
import { withTranslation } from 'react-i18next';

import Components from './components';

class App extends Component {
    constructor(props) {
        super(props);

        let language = localStorage.getItem('language') || "zh";
        if (language !== "zh") {
            props.i18n.changeLanguage(language);
        }

        this.state = {
            language: language,
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

        if (Object.keys(params).length === 1) {
            return
        }

        this.setState({ isLoading: true });

        let url = new URL('https://api.datamuse.com/words');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const results = data;
                this.setState({ results, isLoading: false });
            })
            .catch(error => {
                console.error(error)
                this.setState({ isLoading: false });
            })
    }

    handleKeyDown = event => {
        if(event.key === "Enter") {
            this.onSubmit();
        }
    }

    onSwitchLanguage = () => {
        const { language } = this.state;
        const newLanguage = language === "zh" ? "en" : "zh";
        this.setState(
            { language: newLanguage },
            () => {
                localStorage.setItem("language", newLanguage);
                this.props.i18n.changeLanguage(newLanguage);
            },
        );
    }

    render() {
        const { t } = this.props;
        const { language, filters, isLoading, results } = this.state;
        return (
            <Container>
                <InputGroup className="shadow-sm">
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" onClick={this.onSwitchLanguage}>
                            <span className={language === "zh" ? "font-weight-bolder" : ""}>汉</span>
                            /
                            <span className={language === "en" ? "font-weight-bolder" : ""}>En</span>
                        </Button>
                    </InputGroup.Prepend>
                    <Form.Control as="select" defaultValue="" onChange={this.onChange}>
                        <option value="">{t("查找单词")}</option>
                        {!filters.includes("means") && <option value="means">{t("意思相似")}</option>}
                        {!filters.includes("sounds") && <option value="sounds">{t("发音相似")}</option>}
                        {!filters.includes("spelled") && <option value="spelled">{t("拼写相似")}</option>}
                        {!filters.includes("topics") && <option value="topics">{t("单词分类")}</option>}
                        {!filters.includes("rightContext")
                                && <option value="rightContext">{t("经常出现在后面的单词")}</option>}
                        {!filters.includes("leftContext")
                                && <option value="leftContext">{t("经常出现在前面的单词")}</option>}
                        {!filters.includes("antonyms") && <option value="antonyms">{t("反义词")}</option>}
                    </Form.Control>
                </InputGroup>
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="means"
                    helpText={t('根据单词的含义来查找，例如使用 "ringng in the ears" 来查找 "earing"')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="sounds"
                    helpText={t('根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant"')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="spelled"
                    helpText={t('根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="topics"
                    helpText={t('根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="leftContext"
                    helpText={t('如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="rightContext"
                    helpText={t('如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"')}
                />
                <Components.FindInput
                    filters={filters} onInputChange={this.onInputChange} onDeleteMethod={this.onDeleteMethod}
                    onKeyDown={this.handleKeyDown}
                    type="antonyms"
                    helpText={t('如果想查找 "good", 用反义词来查找，例如 "bad"')}
                />
                {filters.length > 0 &&
                    <Button variant="outline-info" size="lg" block onClick={this.onSubmit}>
                        {t("查找")}
                    </Button>
                }
                <Components.Comment>loading</Components.Comment>
                {isLoading &&
                    <Row className="justify-content-center">
                        <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
                    </Row>
                }
                <Components.Comment>if there are results</Components.Comment>
                <Row className="result-row">
                    {!isLoading && results && results.length > 0 && results.map((result, index) => (
                        <Col key={index} lg={4} md={6} sm={12} className="result-col">
                            <Components.ResultCard result={result} />
                        </Col>
                    ))}
                </Row>
                <Components.Comment>if there is no result</Components.Comment>
                <Row className="justify-content-center">
                    {!isLoading && results && results.length === 0 &&
                        <span>{t("找不到结果")}...</span>
                    }
                </Row>
            </Container>
        );
    }
}

export default withTranslation()(App);
