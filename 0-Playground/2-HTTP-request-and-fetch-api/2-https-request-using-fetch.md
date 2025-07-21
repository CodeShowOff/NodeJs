In modern JavaScript, especially in browser environments, we **don't use `require`**, which is a **CommonJS** (Node.js) feature. Instead, we use ES modules (`import`) or APIs like `fetch()` to retrieve data from a URL.

You're right: `fetch()` is the modern way to make HTTP requests. Here's how to set up something similar to the old `require(url, callback)` pattern using `fetch`.

---

### 🔁 Old-style (example using pseudo-`require`)

```js
require('https://api.example.com/data', function(response) {
  console.log(response);
});
```

---

### ✅ Modern way using `fetch()`

```js
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json(); // or response.text(), etc.
  })
  .then(data => {
    console.log(data); // like the callback
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

---

### ✅ Or using `async/await` (cleaner syntax)

```js
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    const data = await response.json();
    console.log(data); // similar to callback
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

getData();
```

---

### 💡 Summary

| Feature         | `require` (Node)    | `fetch` (Browser)          |
| --------------- | ------------------- | -------------------------- |
| Type            | Module loader       | HTTP Request API           |
| Usage           | `require('module')` | `fetch('url')`             |
| Callback style  | Function argument   | `.then()` or `async/await` |
| Modern approach | `import` or `fetch` | `fetch()`                  |

If you're referring to loading scripts dynamically (like `require` in AMD), let me know, and I can show you how to dynamically import scripts with `import()` too.
