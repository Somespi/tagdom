import { tokenize, parse } from "../core";
import build from "./builder";

function tag(strings: any[], ...values: any[]) {
    let result = '';
    strings.forEach((string, index) => {
        result += string;
        if (values[index]) {
            result += values[index];
        }
    });


    return build(parse(tokenize(result)));
}
export default tag