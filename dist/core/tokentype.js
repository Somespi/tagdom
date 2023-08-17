"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token_type = void 0;
var token_type;
(function (token_type) {
    token_type[token_type["SLASH"] = 0] = "SLASH";
    token_type[token_type["GREATER"] = 1] = "GREATER";
    token_type[token_type["LESS"] = 2] = "LESS";
    token_type[token_type["DASH"] = 3] = "DASH";
    token_type[token_type["SINGLE_QUOTE"] = 4] = "SINGLE_QUOTE";
    token_type[token_type["DOUBLE_QUOTE"] = 5] = "DOUBLE_QUOTE";
    token_type[token_type["ANY"] = 6] = "ANY";
    token_type[token_type["LEFT_BRACKET"] = 7] = "LEFT_BRACKET";
    token_type[token_type["RIGHT_BRACKET"] = 8] = "RIGHT_BRACKET";
    token_type[token_type["EQUAL"] = 9] = "EQUAL";
})(token_type = exports.token_type || (exports.token_type = {}));
