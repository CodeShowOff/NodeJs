Perfect 👍 this is a **classic problem** with integration tests that hit the same DB.

---

### ⚡ Example: Parallel test interference

Say you have two tests:

#### `user.test.js`

```js
import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js';

test('should create a new user', async () => {
  await request(app).post('/users').send({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret123'
  }).expect(201);

  const user = await User.findOne({ email: 'alice@example.com' });
  expect(user).not.toBeNull();
});
```

#### `auth.test.js`

```js
import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js';

test('should login existing user', async () => {
  await new User({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret123'
  }).save();

  await request(app).post('/users/login').send({
    email: 'alice@example.com',
    password: 'secret123'
  }).expect(200);
});
```

---

### 🚨 What happens if Jest runs these in **parallel**:

1. `user.test.js` is **creating Alice**.
2. At the **same time**, `auth.test.js` is also **creating Alice**.
3. MongoDB complains:

```
E11000 duplicate key error collection: test.users index: email dup key: { email: "alice@example.com" }
```

Or one test fails because the user already exists, depending on timing.

---

### ✅ Solution: `--runInBand`

When you run Jest with `--runInBand`, it executes **tests sequentially**:

* First, `user.test.js` runs (creates Alice).
* Then, Jest moves to `auth.test.js`.

This avoids race conditions, duplicate inserts, or deletion clashes (like `deleteMany()` wiping data while another test expects it).

---

### 💡 Other real-world cases where parallel tests interfere:

* Two tests both call `await User.deleteMany()` at the same time → DB ends up empty unexpectedly.
* One test deletes a user that another test is about to use.
* File upload tests both write to the same filename (`avatar.png`) → files get corrupted.

---

👉 That’s why for DB-backed apps like yours, `--runInBand` is a lifesaver.
Later, when your suite is big, you can **use an in-memory MongoDB per test worker** (`mongodb-memory-server`) so tests can safely run in parallel.

---

Do you want me to show you how to set up `mongodb-memory-server` so your tests don’t need `--runInBand` and can run safely in parallel?
