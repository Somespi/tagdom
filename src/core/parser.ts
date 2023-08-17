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
        throw "Parse: Unexpected token";
    return true
}

const parser = (tokens: Token[]): Tag[] => {
    let currentok = 0;
    let tags: Tag[] = []
    while (currentok < tokens.length) {
        
        const token = () => tokens[currentok];
        const next = () => currentok++;


        const parseTag = (): Tag => {
            except(token().type , token_type.LESS) 
            
            next(); // eats LESS
            
            except(token().type, token_type.ANY)

                let tag: Tag = { name: token().value, value: "", children: [] }

                next()
                except(token().type, token_type.GREATER)
                next()
                
                
            while (!(compare(token().type, token_type.LESS) && tokens[currentok + 1].value == tag.name && tokens[currentok+2].type == token_type.SLASH)) {
                    if(compare(token().type, token_type.ANY)) {
                        tag.value += token().value;
                    } else if (compare(token().type, token_type.LESS)) {
                        tag.children.push(parseTag());
                    } else {
                        break
                    }
                    next();
                }
                
                return tag;
        }

        if (token().type == token_type.LESS) tags.push(parseTag());
        next();
    }
    return tags
}

