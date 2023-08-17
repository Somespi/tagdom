import tokenize from "./lexer";
import { Tag } from "./tagging";
import { Token, token_type } from "./tokentype";



const compare = (a: token_type, b: token_type) => {
    if (a == b)
        return true;
    return false;
}


const except = (current: token_type, a: token_type) => {
    if (current.toString() != a.toString())
        throw "Parse: Unexpected token, Excepted: " + a + ", Got: " + current;
    return true
}

export const parse = (tokens: Token[]): Tag[] => {
    let currentTokenIndex = 0;
    const tags: Tag[] = [];

    const nextToken = () => {
        currentTokenIndex++;
    };

    const currentToken = () => {
        return tokens[currentTokenIndex];
    };

    const compareTokenType = (a: token_type, b: token_type) => {
        return a === b;
    };

    const parseTag = (): Tag | undefined => {
        if (compareTokenType(currentToken().type, token_type.LESS)) {
            nextToken(); // Eats LESS


            if (compareTokenType(currentToken().type, token_type.SLASH)) {
                nextToken(); // Eats SLASH
                const tagName = currentToken().value; // Closing tag name
                nextToken();
                if (!compareTokenType(currentToken().type, token_type.GREATER)) {
                    throw `Parse: Unexpected token, Expected: ${token_type.GREATER}, Got: ${currentToken().type}`;
                }
                nextToken();
                return { name: tagName, value: "", children: [], attributes: [] };


            } else if (compareTokenType(currentToken().type, token_type.ANY)) {
                const tagName = currentToken().value.trim();
                nextToken();


                if (!compareTokenType(currentToken().type, token_type.GREATER) && !compareTokenType(currentToken().type, token_type.LEFT_BRACKET)) {
                    throw `Parse: Unexpected token, Expected: ${token_type.GREATER}, Got: ${currentToken().type}`;
                }
                let attributes: { name: string, value: string }[] = []
                if(compareTokenType(currentToken().type, token_type.LEFT_BRACKET)) {
                    nextToken();
                    while (!(compareTokenType(currentToken().type, token_type.RIGHT_BRACKET))) {
                        let attr: { name: string, value: string } = {
                            name: "",
                            value: ""
                        }

                        if(compareTokenType(currentToken().type, token_type.ANY)) {
                            attr.name = currentToken().value;
                            nextToken();
                            except(currentToken().type, token_type.EQUAL);
                            nextToken()
                            except(currentToken().type, token_type.DOUBLE_QUOTE);
                            nextToken();
                            attr.value = currentToken().value;
                            nextToken();
                            except(currentToken().type, token_type.DOUBLE_QUOTE);
                            attributes.push(attr)
                        }
                        nextToken()
                    }
                    
                }


                nextToken();
                const tag: Tag = {
                    name: tagName, value: "", children: [],
                    attributes: attributes
                };
                while (!(compareTokenType(currentToken().type, token_type.LESS) && compareTokenType(tokens[currentTokenIndex + 1].type, token_type.SLASH) && tokens[currentTokenIndex + 2].value === tag.name)) {


                    if (compareTokenType(currentToken().type, token_type.ANY) && !compareTokenType(tokens[currentTokenIndex + 1].type, token_type.GREATER)) {

                        tag.value += currentToken().value;

                    } else if (compareTokenType(currentToken().type, token_type.LESS) && compareTokenType(tokens[currentTokenIndex + 1].type, token_type.ANY)) {
                        tag.children.push(parseTag() as Tag);
                    }
                    nextToken();
                }
                return tag;
            }
        }
    };

    while (currentTokenIndex < tokens.length) {
        if (compareTokenType(currentToken().type, token_type.LESS)) {
            tags.push(parseTag() as Tag);
        }
        nextToken();
    }

    return tags;
};

console.log(parse(tokenize("<foo {class=\"bar\" id=\"baz\"}>bar</foo>"))[0].attributes);