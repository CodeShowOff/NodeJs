Great question 👌

By default, **Mongoose does NOT run schema validators on updates** (like `findByIdAndUpdate`, `updateOne`, etc.), because updates are applied **directly in MongoDB** and bypass the usual document `save()` middleware/validation process.

That’s where `runValidators: true` comes in.

---

### Example Without `runValidators`

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 }
});

const User = mongoose.model("User", userSchema);

// Try to set age < 18
await User.findByIdAndUpdate(id, { age: 15 });
```

👉 This will **succeed** by default, even though the schema says `min: 18`.
Validators are skipped unless you tell Mongoose to run them.

---

### Example With `runValidators: true`

```js
await User.findByIdAndUpdate(
  id,
  { age: 15 },
  { new: true, runValidators: true }
);
```

👉 This will **throw a validation error** because `age` must be ≥ 18.

---

### Why `runValidators` is needed

* **Default behavior**: Updates bypass schema validation for performance.
* **With `runValidators: true`**: Mongoose checks the updated values against the schema before sending them to MongoDB.

---

⚡ Quick note:
Even with `runValidators: true`, Mongoose only validates the **fields being updated** (not the entire document).

---

Would you like me to also explain the difference between **`validateBeforeSave`** (for `.save()`) and **`runValidators`** (for updates)? They’re related but used in different scenarios.
