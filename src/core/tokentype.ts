export enum token_type {
    SLASH,
    GREATER,
    LESS,
    DASH,
    SINGLE_QUOTE,
    DOUBLE_QUOTE,
    ANY
}


export interface Token {
    type: token_type;
    value: string;
    index: number;
}