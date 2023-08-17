"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build = (tag) => {
    let element = document.createElement(tag.name);
    element.innerHTML = tag.value;
    tag.children.forEach(child => {
        element.appendChild(build(child));
    });
    return element;
};
exports.default = build;
