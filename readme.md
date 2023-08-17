# TagDOM

convert HTML-like tags into native DOM elements with TagDOM.



## Installation 

You can install TagDOM using npm:

```sh
npm install tagdom
```



## Sample Usage

you can easily use TagDOM with this minimal syntax:

```js
import {tag} from 'tagdom';

const myelement = tag`<h1 {style="color:red;"}>Hello, World!</h1>`;
document.body.appendChild(myelement);
```







### :book: Note

TagDOM can be Whitespace-sensitive sometimes. ,  for example:

```js
// This may not work ❌
const myelement = tag`<h1 {style="color:red;"} >Hello, World!</h1>`;

// you need to remove any whitespace between "}" and ">"
// This may work ✅
const myelement = tag`<h1 {style="color:red;"}>Hello, World!</h1>`;
```


## License

This project is licensed under the [MIT License](./LICENSE).