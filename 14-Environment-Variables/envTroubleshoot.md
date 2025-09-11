Got it 👍 Thanks for pasting the logs.

The key part is this:

```
undefined
```

That means `process.env.API_KEY` is coming back as `undefined`. This usually happens for one of these reasons:

---

### ✅ Common Fixes

1. **Check `.env` location**
   Make sure the `.env` file is in your project **root folder** (not inside `src/`).

   ```
   tasks-app/
   │── src/
   │   └── index.js
   │── .env   <-- here
   │── package.json
   ```

2. **Check `.env` content**
   It should look like this (no quotes, no spaces around `=`):

   ```env
   API_KEY=super-secret-api-key
   PORT=3000
   ```

   ❌ Wrong:

   ```env
   API_KEY = "super-secret-api-key"
   ```

   ✅ Right:

   ```env
   API_KEY=super-secret-api-key
   ```

3. **Load dotenv at the top of `index.js`**

   ```js
   import dotenv from "dotenv";
   dotenv.config();

   console.log("API_KEY:", process.env.API_KEY);
   ```

   If you import anything **before** calling `dotenv.config()`, your env vars may not be loaded in time.

4. **Restart the dev server**
   Since you’re using `--watch`, try stopping (`Ctrl+C`) and restarting `npm run dev`.
   Sometimes changes in `.env` are not picked up until a fresh restart.

5. **Verify file encoding**
   If `.env` was created in Windows Notepad, it might have BOM characters. Re-save it in VS Code as **UTF-8 without BOM**.

---

### 🔍 Quick Debug

Add this to `index.js` right after `dotenv.config()`:

```js
console.log("ENV loaded:", process.env);
```

If you don’t see your `API_KEY` there, the issue is with the `.env` file placement or formatting.

---

👉 Want me to show you an updated **`src/index.js`** example with MongoDB + `.env` all wired together properly? That way we can match your setup exactly.
