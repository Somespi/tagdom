import { tokenize, parse } from "../core/";
import { Tag } from "../core/tagging";

const build  = (tag: Tag): HTMLElement => {
    let element: HTMLElement  = document.createElement(tag.name);
    element.innerHTML = tag.value;
    tag.children.forEach(child => {
        element.appendChild(build(child));
    })

    return element;

}
export default build