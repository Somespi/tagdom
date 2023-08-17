import { Token } from "./tokentype";
/**
 * Tokenizes a given code string and returns an array of tokens.
 *
 * @param {string} code - The code string to be tokenized.
 * @return {Token[]} - An array of tokens representing the code string.
 */
declare const tokenize: (code: string) => Token[];
export default tokenize;
