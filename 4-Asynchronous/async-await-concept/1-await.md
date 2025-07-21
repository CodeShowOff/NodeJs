In JavaScript (and many other languages with async features), `await` is used **inside an `async` function** to pause the execution of that function until a `Promise` is **resolved** (success) or **rejected** (error).

### ✅ What `await` does:

* **Pauses** the execution of the async function at that point.
* **Waits** for the `Promise` to settle (either resolved or rejected).
* **Resumes** execution and returns the resolved value (or throws the error if rejected).

#### Example:

```js
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data); // only runs after the above awaits are done
}
```

### ❌ What happens **if you don't use `await`**:

If you call a function that returns a Promise **without `await`**, JavaScript does **not wait** for it to finish. Instead, it moves on immediately.

#### Example without `await`:

```js
async function fetchData() {
  const response = fetch('https://api.example.com/data');
  console.log(response); // logs a Promise, not the actual response
}
```

* `response` is a **Promise**, not the actual response.
* If you try to use the data directly, it won't work as expected because it's not ready yet.

---

### Summary:

| With `await`                | Without `await`                |
| --------------------------- | ------------------------------ |
| Waits for Promise to finish | Does **not** wait              |
| Returns actual value        | Returns a **Promise**          |
| Makes code easier to read   | Can lead to confusing behavior |

---

Let me know if you want to see how this compares to using `.then()` or want a real-world analogy!
