Ahhh nice catch ⚡️ That’s because of how **default exports** + destructuring behave. Let’s unpack this carefully.

---

### Your `db.js`

```js
export default {
  userOneId,
  userOne,
  setupDatabase
}
```

This means: the module exports **one object** with 3 properties.

---

### What happens when you import

1. If you do:

```js
import db from './fixtures/db.js';
```

👉 `db` is that whole object:

```js
db = {
  userOneId: <ObjectId>,
  userOne: { ... },
  setupDatabase: [AsyncFunction]
}
```

So `db.setupDatabase()` works fine ✅

---

2. But if you do:

```js
import { userOne, userOneId, setupDatabase } from './fixtures/db.js';
```

👉 This is **named import syntax**, and it only works if the module explicitly did:

```js
export const userOne = { ... };
export const setupDatabase = async () => {};
```

But since you used a **default export**, there are **no named exports** — just one unnamed object.

That’s why `setupDatabase` (and the others) don’t exist as named exports, and Jest yelled.

---

### ⚠️ Why it seemed like the other two worked

They actually didn’t. If you imported like this:

```js
import { userOne } from './fixtures/db.js';
```

…it should have failed the same way.
Maybe in your test you weren’t destructuring them, but instead accessed them through `db.userOne` or `db.userOneId`. That works because you’re pulling properties off the **default object**.

---

### ✅ Summary

* **Default export** → you import with any name (no `{}`), then access properties.
* **Named exports** → you import with `{}` and must match names exactly.

Your test used named import syntax, but your `db.js` only has a default export → mismatch.

---

Would you like me to show you a **side-by-side example** of your current `db.js` (default) vs fixed `db.js` (named) with the exact matching test code? That way you’ll see the difference instantly.
