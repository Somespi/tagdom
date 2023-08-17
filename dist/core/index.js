"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.tokenize = void 0;
var lexer_1 = require("./lexer");
Object.defineProperty(exports, "tokenize", { enumerable: true, get: function () { return __importDefault(lexer_1).default; } });
var parser_1 = require("./parser");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return __importDefault(parser_1).default; } });
