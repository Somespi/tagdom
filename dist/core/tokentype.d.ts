export declare enum token_type {
    SLASH = 0,
    GREATER = 1,
    LESS = 2,
    DASH = 3,
    SINGLE_QUOTE = 4,
    DOUBLE_QUOTE = 5,
    ANY = 6,
    LEFT_BRACKET = 7,
    RIGHT_BRACKET = 8,
    EQUAL = 9
}
export interface Token {
    type: token_type;
    value: string;
    index: number;
}
