✅ How to Use Partials (Includes) in EJS

You just create a reusable file (like header.ejs or footer.ejs) and include it inside your main template with:

<%- include('partials/header') %>

🔑 Note: use <%- %> (not <%= %>) so the HTML is rendered instead of escaped.




### 🔑 In **EJS**:

* There’s **no need to register partials**.
* Any file inside your `views` folder (or subfolders) can be included directly with:

  ```ejs
  <%- include('partials/header') %>
  ```
* As long as your `views` path is set:

  ```js
  app.set('views', resolve(__dirname, '../views'));
  ```


---


Good question 👍

By default, **yes** — Express looks for EJS templates (including partials) inside the folder you’ve set with:

```js
app.set('views', resolve(__dirname, '../views'));
```

So if you do:

```ejs
<%- include('partials/header') %>
```

EJS expects `views/partials/header.ejs`.

---

### 🔑 But partials **don’t have to be only inside `views/`**

* You can organize them in **any folder**, as long as that folder is inside your `views` path.

* For example, you could have:

  ```
  views/
  ├── layouts/
  ├── pages/
  └── components/   <-- reusable partials here
  ```

  and then include with:

  ```ejs
  <%- include('components/navbar') %>
  ```

* If you want **partials outside the `views` folder**, you can add multiple view paths:

  ```js
  app.set('views', [
    resolve(__dirname, '../views'),
    resolve(__dirname, '../shared-partials')
  ]);
  ```

  Now you can `include('header')` from either folder.

---

👉 So the short answer:

* **Default:** partials must live somewhere inside your `views/` directory.
* **Advanced:** you can configure multiple folders if you want partials elsewhere.

---

Do you want me to show you an example where `views/` contains only page templates, and all partials are kept in a **separate folder (`partials/`) outside `views/`**?
