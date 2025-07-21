When someone appends something like `?key=value` to the end of a URL, they are using what's called a **query string**, and the part that comes after the `?` symbol is made up of **URL parameters** (also called **query parameters**).

---

### 🔍 What Is a Query String?

A **query string** is a portion of the URL that carries additional data to be sent to the server, typically used to:

* **Filter** or **search** for specific results
* **Send options** or **preferences** to the backend
* **Identify** a resource (like an API key or user ID)

It starts with a **question mark (`?`)** and consists of **key-value pairs**, such as:

```
?key=value
```

Multiple pairs can be joined using an **ampersand (`&`)**:

```
?user=john&sort=asc&page=2
```

---

### 📌 Example in Real Life

Suppose you visit:

```
https://example.com/products?category=shoes&color=black
```

This URL is asking the server for **products** in the **shoes category** that are **black** in color. On the backend, the server will likely parse these parameters to return only matching products.

---

### ⚙️ How It Works in Code (Backend)

In most server frameworks (like Express in Node.js), query parameters can be accessed easily:

```js
app.get('/products', (req, res) => {
  const category = req.query.category; // 'shoes'
  const color = req.query.color;       // 'black'
});
```

---

### 🧪 Use Cases

1. **Search Queries**:

   ```
   https://example.com/search?q=javascript
   ```

2. **API Calls**:

   ```
   https://api.weather.com/data?city=London&units=metric
   ```

3. **Pagination**:

   ```
   https://example.com/posts?page=3&limit=10
   ```

4. **Authentication Keys** (not secure in URLs, but sometimes used):

   ```
   https://api.example.com/data?apikey=123456
   ```

---

### 🔒 Important Notes

* Query strings are visible in the browser address bar and can be bookmarked or shared.
* They **should not** be used for sensitive data (like passwords or tokens).
* They are mostly used with **GET** requests, not **POST**.

---

So when the person added `?key=value` to a URL, they were likely customizing the request or passing data to the server using query parameters. This is a fundamental part of how web apps and APIs exchange data.
