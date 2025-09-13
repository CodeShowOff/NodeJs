Great question 🙌 let’s break it down.

---

### 🔹 Default export

When you do:

```js
export default {
  userOneId,
  userOne,
  setupDatabase
};
```

You’re saying: “this file exports **one thing** (an object).”
So to import it, you must use **any name you like**, no `{}`:

```js
import db from './fixtures/db.js';

db.setupDatabase();
console.log(db.userOne);
```

You **can’t** do:

```js
import { setupDatabase } from './fixtures/db.js'; // ❌ won’t work
```

because `setupDatabase` is not a *named export*, it’s just a property on that default object.

---

### 🔹 Named exports

When you do:

```js
export const userOneId = new mongoose.Types.ObjectId();
export const userOne = { /* ... */ };
export const setupDatabase = async () => { /* ... */ };
```

or at the bottom:

```js
export { userOneId, userOne, setupDatabase };
```

You’re saying: “this file exports **several things individually, by name**.”

Then you import with `{}`:

```js
import { userOneId, userOne, setupDatabase } from './fixtures/db.js';

beforeEach(setupDatabase);
```

Here, `{}` means “grab the export with this exact name.”

---

### 🔹 Why your test failed

Your `db.js` had **only a default export**.
But your test tried to import a **named export**:

```js
import { setupDatabase } from './fixtures/db.js'; // ❌ Not found
```

That’s why Jest complained:

```
SyntaxError: The requested module './fixtures/db.js' does not provide an export named 'setupDatabase'
```

---

### ✅ Rule of thumb

* Use **default export** if your file represents **one main thing** (e.g. a class, a React component, an Express app).
* Use **named exports** if your file has **multiple helpers/data** (like your test fixtures).

---

👉 In your case (`db.js` with multiple values like `userOneId`, `userOne`, `setupDatabase`), named exports make the most sense.

---

Do you want me to rewrite your `db.js` into clean **named exports style**, so it matches your test code exactly?
