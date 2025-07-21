That part at the end of the URL — starting with a `?` and followed by `key=value` pairs — is called a **query string**, and the individual parts are called **query parameters**.

---

### 🧩 Example:

```url
https://example.com/api/users?name=John&age=25
```

* `?name=John&age=25` → the **query string**
* `name=John` and `age=25` → individual **query parameters**

---

### ✅ Purpose:

Query parameters are used to **send data to the server** as part of a GET request — like filters, search terms, pagination, etc.

---

### 🛠️ On the server:

They are parsed and handled by backend code to filter or modify the response. For example:

```js
// Express.js server
app.get('/api/users', (req, res) => {
  const name = req.query.name; // "John"
  const age = req.query.age;   // "25"
});
```

---

### 🧠 Bonus:

If you're building URLs dynamically in JS, you can use:

```js
const url = new URL('https://example.com/api');
url.searchParams.append('key', 'value');
console.log(url.toString()); // https://example.com/api?key=value
```

Let me know if you want help building or parsing query strings!
