"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build = (tag) => {
    let element = document.createElement(tag.name);
    element.innerHTML = tag.value;
    tag.children.forEach(child => {
        element.appendChild(build(child));
    });
    tag.attributes.forEach(attr => {
        element.setAttribute(attr.name, attr.value);
    });
    return element;
};
exports.default = build;
