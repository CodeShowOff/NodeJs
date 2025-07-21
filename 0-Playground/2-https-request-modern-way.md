To make HTTP requests in a **modern way in Node.js**, here are the top approaches, depending on what you're doing:

---

## ✅ 1. **Use `fetch()` — Now built-in (since Node.js v18)**

No need to install anything.

### Example:

```js
// Make sure you're using Node.js v18 or higher
const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
const data = await response.json();
console.log(data);
```

> ⚠️ If you're using an older Node version, you’ll need to either upgrade or use a polyfill like `node-fetch`.

---

## ✅ 2. **Use `axios` — Popular third-party library**

Install:

```bash
npm install axios
```

Example:

```js
const axios = require("axios");

axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
```

> `axios` supports more features like interceptors, default headers, timeouts, etc., and it's very popular in both Node and frontend apps.

---

## ✅ 3. **Native `https` module** — Lower-level, not preferred unless you're doing advanced things

Example:

```js
const https = require("https");

https
  .get("https://jsonplaceholder.typicode.com/posts/1", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (err) => {
    console.error("Error:", err);
  });
```

> Fine for internal tools or learning, but verbose compared to `fetch()` or `axios`.

---

## ✅ Which should _you_ use?

| Use Case                                          | Recommendation                           |
| ------------------------------------------------- | ---------------------------------------- |
| Node.js v18+                                      | `fetch()` (clean, native, promise-based) |
| Need robust config (timeouts, interceptors, etc.) | `axios`                                  |
| Node.js v16 or below                              | `axios` or `node-fetch`                  |
| Learning or very low-level need                   | `https` module                           |
