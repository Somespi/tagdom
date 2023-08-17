import { Token, token_type } from "./tokentype";

/**
 * Tokenizes a given code string and returns an array of tokens.
 *
 * @param {string} code - The code string to be tokenized.
 * @return {Token[]} - An array of tokens representing the code string.
 */
const tokenize = (code: string): Token[] => {
    const tokens: Token[] = []
    let currentIndex = 0;
    let currentToken = ''

    while (currentIndex < code.length) {
        switch (code[currentIndex]) {
            case '>':
                tokens.push({
                    type: token_type.GREATER,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;

            case '<':
                tokens.push({
                    type: token_type.LESS,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;

            case '/':
                tokens.push({
                    type: token_type.SLASH,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;

            case '"':
                tokens.push({

                    type: token_type.DOUBLE_QUOTE,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;
            case "'":
                tokens.push({
                    type: token_type.SINGLE_QUOTE,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;

            
            case '=':
                tokens.push({
                    type: token_type.EQUAL,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;

            case '{':
                tokens.push({
                    type: token_type.LEFT_BRACKET,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;
            
            case '}':
                tokens.push({
                    type: token_type.RIGHT_BRACKET,
                    value: code[currentIndex],
                    index: currentIndex
                })
                break;
            
            default:
                if (currentToken && tokens.length > 0 && tokens[tokens.length - 1].type === token_type.ANY) {
                    tokens[tokens.length - 1].value += code[currentIndex];
                } else {
                    currentToken = code[currentIndex];
                    tokens.push({
                        type: token_type.ANY,
                        value: currentToken,
                        index: currentIndex,
                    });
                }
                break;
        }

        currentIndex++;
    }



    return tokens
}

console.log(tokenize("<foo id=\"\" >bar</foo>"));
export default tokenize
