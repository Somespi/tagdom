"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const builder_1 = __importDefault(require("./builder"));
function tag(strings, ...values) {
    let result = '';
    strings.forEach((string, index) => {
        result += string;
        if (values[index]) {
            result += values[index];
        }
    });
    return (0, builder_1.default)((0, core_1.parse)((0, core_1.tokenize)(result)));
}
exports.default = tag;
