import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "查找单词": "Find word",
                    "查找": "search",
                    "找不到结果": "No result",
                    "意思相似": "Means like",
                    "发音相似": "Sounds like",
                    "拼写相似": "Spelled like",
                    "单词分类": "Topics",
                    "经常出现在后面的单词": "Context Right",
                    "经常出现在前面的单词": "Context Left",
                    "反义词": "Antonyms",
                    '如果想查找 "good", 用反义词来查找，例如 "bad"':
                    '如果想查找 "good", 用反义词来查找，例如 "bad"',
                    '如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"':
                    '如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"',
                    '如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"':
                    '如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"',
                    '根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔':
                    '根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔',
                    '根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符':
                    '根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符',
                    '根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant"':
                    '根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant"',
                }
            },
            zh: {
                translations: {
                    "查找单词": "查找单词",
                    "找不到结果": "找不到结果",
                    "查找": "查找",
                    "意思相似": "意思相似",
                    "发音相似": "发音相似",
                    "拼写相似": "拼写相似",
                    "单词分类": "单词分类",
                    "经常出现在后面的单词": "经常出现在后面的单词",
                    "经常出现在前面的单词": "经常出现在前面的单词",
                    "反义词": "反义词",
                    '如果想查找 "good", 用反义词来查找，例如 "bad"':
                    '如果想查找 "good", 用反义词来查找，例如 "bad"',
                    '如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"':
                    '如果想查找 "kind", 用经常出现在kind后面的单词来查找，例如 "person"',
                    '如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"':
                    '如果想查找 "person", 用经常出现在person前面的单词来查找，例如 "kind"',
                    '根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔':
                    '根据单词的主题来查找，例如使用 "fruit" 来查找 "apple", 最多五个主题，主题之间用空格分隔',
                    '根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符':
                    '根据单词的拼写来查找，例如使用 "app??" 或 "app*" 来查找 "apple", "?"代表一个字符, "*"代表多个字符',
                    '根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant"':
                    '根据单词的发音来查找，例如使用 "elefint" 来查找 "elephant"',
                    '根据单词的含义来查找，例如使用 "ringng in the ears" 来查找 "earing"': '根据单词的含义来查找，例如使用 "ringng in the ears" 来查找 "earing"',
                }
            },
        },
        fallbackLng: "zh",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true
        }
    });

export default i18n;
