"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const tokentype_1 = require("./tokentype");
const compare = (a, b) => {
    if (a == b)
        return true;
    return false;
};
const except = (current, a) => {
    if (current.toString() != a.toString())
        throw "Parse: Unexpected token, Excepted: " + a + ", Got: " + current;
    return true;
};
const parse = (tokens) => {
    let currentTokenIndex = 0;
    let tag = {
        name: "",
        value: "",
        attributes: [],
        children: []
    };
    const nextToken = () => {
        currentTokenIndex++;
    };
    const currentToken = () => {
        return tokens[currentTokenIndex];
    };
    const compareTokenType = (a, b) => {
        return a === b;
    };
    const parseTag = () => {
        if (compareTokenType(currentToken().type, tokentype_1.token_type.LESS)) {
            nextToken(); // Eats LESS
            if (compareTokenType(currentToken().type, tokentype_1.token_type.SLASH)) {
                nextToken(); // Eats SLASH
                const tagName = currentToken().value; // Closing tag name
                nextToken();
                if (!compareTokenType(currentToken().type, tokentype_1.token_type.GREATER)) {
                    throw `Parse: Unexpected token, Expected: ${tokentype_1.token_type.GREATER}, Got: ${currentToken().type}`;
                }
                nextToken();
                return { name: tagName, value: "", children: [], attributes: [] };
            }
            else if (compareTokenType(currentToken().type, tokentype_1.token_type.ANY)) {
                const tagName = currentToken().value.trim();
                nextToken();
                if (!compareTokenType(currentToken().type, tokentype_1.token_type.GREATER) && !compareTokenType(currentToken().type, tokentype_1.token_type.LEFT_BRACKET)) {
                    throw `Parse: Unexpected token, Expected: ${tokentype_1.token_type.GREATER}, Got: ${currentToken().type}`;
                }
                let attributes = [];
                if (compareTokenType(currentToken().type, tokentype_1.token_type.LEFT_BRACKET)) {
                    nextToken();
                    while (!(compareTokenType(currentToken().type, tokentype_1.token_type.RIGHT_BRACKET))) {
                        let attr = {
                            name: "",
                            value: ""
                        };
                        if (compareTokenType(currentToken().type, tokentype_1.token_type.ANY)) {
                            attr.name = currentToken().value;
                            nextToken();
                            except(currentToken().type, tokentype_1.token_type.EQUAL);
                            nextToken();
                            except(currentToken().type, tokentype_1.token_type.DOUBLE_QUOTE);
                            nextToken();
                            attr.value = currentToken().value;
                            nextToken();
                            except(currentToken().type, tokentype_1.token_type.DOUBLE_QUOTE);
                            attributes.push(attr);
                        }
                        nextToken();
                    }
                }
                nextToken();
                const tag = {
                    name: tagName, value: "", children: [],
                    attributes: attributes
                };
                while (!(compareTokenType(currentToken().type, tokentype_1.token_type.LESS) && compareTokenType(tokens[currentTokenIndex + 1].type, tokentype_1.token_type.SLASH) && tokens[currentTokenIndex + 2].value === tag.name)) {
                    if (compareTokenType(currentToken().type, tokentype_1.token_type.ANY) && !compareTokenType(tokens[currentTokenIndex + 1].type, tokentype_1.token_type.GREATER)) {
                        tag.value += currentToken().value;
                    }
                    else if (compareTokenType(currentToken().type, tokentype_1.token_type.LESS) && compareTokenType(tokens[currentTokenIndex + 1].type, tokentype_1.token_type.ANY)) {
                        tag.children.push(parseTag());
                    }
                    nextToken();
                }
                return tag;
            }
        }
    };
    while (currentTokenIndex < tokens.length) {
        if (compareTokenType(currentToken().type, tokentype_1.token_type.LESS)) {
            tag = parseTag();
        }
        nextToken();
    }
    return tag;
};
exports.parse = parse;
exports.default = exports.parse;
