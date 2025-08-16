Here’s a concise breakdown of the five main HTTP methods you listed:

---

**1. GET**

* **Summary:** Requests data from the server without modifying it.
* **Uses:**

  * Fetch a webpage, image, or API data.
  * Used for read-only operations.
  * Shouldn’t have side effects (safe and idempotent).

**2. POST**

* **Summary:** Sends data to the server to create a new resource.
* **Uses:**

  * Submit forms.
  * Upload files.
  * Create new database entries.
  * Not idempotent (repeating the request can create duplicates).

**3. PUT**

* **Summary:** Sends data to completely replace a resource at a specified URL.
* **Uses:**

  * Update a user’s profile (replacing all fields).
  * Replace a file on the server.
  * Idempotent (sending the same request again has the same effect).

**4. PATCH**

* **Summary:** Sends partial updates to an existing resource.
* **Uses:**

  * Change only one field in a user profile (e.g., update just the email).
  * Apply incremental changes without sending the full resource.

**5. DELETE**

* **Summary:** Requests the server to remove a resource.
* **Uses:**

  * Delete a blog post.
  * Remove a file.
  * Idempotent (repeating it still results in the resource being gone).

