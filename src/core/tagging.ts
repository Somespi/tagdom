
export interface Tag {
    name: string,
    value: string,
    attributes: {name: string, value: string}[]
    children: Tag[]
}