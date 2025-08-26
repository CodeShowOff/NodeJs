Awesome question 👏 — you’re connecting async/await with the old promise `.then/.catch` flow.

Here’s the key idea:

---

### 1. With Promises

```js
db.collection('users')
  .updateOne({ name: 'tia' }, { $set: { name: 'tiya' } })
  .then(result => {
    console.log(result);   // success (resolved)
  })
  .catch(err => {
    console.error(err);    // failure (rejected)
  });
```

* If the promise **resolves** → goes into `.then(...)`.
* If the promise **rejects** → goes into `.catch(...)`.

---

### 2. With async/await

```js
try {
  const result = await db.collection('users').updateOne(
    { name: 'tia' },
    { $set: { name: 'tiya' } }
  );
  console.log(result);   // success (resolved)
} catch (err) {
  console.error(err);    // failure (rejected)
}
```

* `await` unwraps the Promise.
* If the Promise **resolves** → you get the value in `result`.
* If the Promise **rejects** → an **exception is thrown** at that line.
* That’s why we wrap it in `try { ... } catch (err) { ... }`.

So **`catch` in async/await = `.catch` in Promises**.

---

### 3. Quick mental model

* Promise → “future value”. Use `.then/.catch`.
* Await → “pause until resolved/rejected”. Use `try/catch`.

They’re just two different syntaxes around the same thing.

---

⚡ Example with a guaranteed failure:

```js
try {
  const result = await db.collection('users').updateOne(
    { _id: "not-a-valid-id" },   // this will throw
    { $set: { name: 'tiya' } }
  );
  console.log(result);
} catch (err) {
  console.error("Error occurred:", err.message);
}
```

Here the error from MongoDB gets caught in the `catch` block — exactly like a rejected promise would land in `.catch()`.