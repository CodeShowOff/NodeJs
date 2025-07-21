Ah — now I get you! You're asking about this in the context of **URLs**:

---

### 🔍 What is `Los%20Angeles` in a URL?

This is a **URL-encoded string**. The `%20` represents a **space character**.

So:

```
Los%20Angeles  ===  "Los Angeles"
```

---

### ✅ Why does this happen?

Web browsers and servers use **URL encoding** to safely represent characters like spaces, slashes, question marks, etc., inside a URL.

| Character | Encoded as |
| --------- | ---------- |
| (space)   | `%20`      |
| `"`       | `%22`      |
| `/`       | `%2F`      |
| `?`       | `%3F`      |

So if you visit:

```
https://example.com/cities/Los%20Angeles
```

It actually means:

```
https://example.com/cities/Los Angeles
```

---

### ✅ When do you need to encode?

If you're building a URL in code, and the string has spaces or special characters, you should encode it:

```js
const city = "Los Angeles";
const encoded = encodeURIComponent(city); // "Los%20Angeles"
const url = `https://example.com/cities/${encoded}`;
```

---

### ✅ Summary:

| You see in URL  | It means                     |
| --------------- | ---------------------------- |
| `Los%20Angeles` | `"Los Angeles"` (with space) |
| `Los%20Angeles` | `"Los Angeles"`              |
