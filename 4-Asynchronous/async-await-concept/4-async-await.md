Yes — `await` only works **inside an `async` function** (unless you're using **top-level await** in Node.js 18+). Here's the full version **inside an `async` function**:

---

### ✅ Modern Version Using `fetch` inside `async` function:

```js
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  console.log(data);
}

getData();

```

---

### Or, if you're using Node.js v18+ (supports top-level `await`):

You can also write:

```js
const url = 'https://jsonplaceholder.typicode.com/posts/1';

const response = await fetch(url);
const data = await response.json();
console.log(data.currently);
```

> But this only works in `.mjs` files or if `"type": "module"` is set in `package.json`.

---

### 🔹 "Top-level" means:

**Code that is not inside any function, block, or scope — it's directly at the outermost level of your file.**

So yes, **top of the file (or anywhere outside functions)**.

---

### 🔍 Example (Top-level `await`):

```js
// ✅ This is top-level
const response = await fetch('https://api.com/data');
const data = await response.json();
console.log(data);
```

You're using `await` **outside any function** — that’s **top-level `await`**.

---

### 🛑 This is NOT top-level:

```js
function fetchData() {
  const data = await fetch(...); // ❌ SyntaxError (unless inside async)
}
```

---

### ✅ To use top-level `await` in Node.js:

* Either save your file with a `.mjs` extension
  **OR**
* Add this to `package.json`:

```json
"type": "module"
```

Then Node will treat your file as a module and allow top-level `await`.