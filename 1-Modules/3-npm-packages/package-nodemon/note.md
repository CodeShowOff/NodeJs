# Installing a Module Globally (Not Project-Level)

Some npm modules are meant to be installed **globally**, as they provide tools or commands that can be used directly from the terminal, rather than being imported into your code.

In this case, we'll install the `nodemon` module globally.

## What is Nodemon?

`nodemon` is a utility that runs your Node.js application and automatically restarts it whenever file changes are detected. This is especially useful during development, as it provides a "live reload" experience.

## Global Installation

To install `nodemon` globally, use the `-g` flag:

```bash
npm install -g nodemon
````

* This installs `nodemon` system-wide, not in your project folder.
* It will not appear in your `package.json` dependencies.
* It's a development tool, not a project dependency.

## Why Install Globally?

Since `nodemon` is used as a command-line tool to run your application, not as a library to be imported, it makes sense to install it globally. This way, you can use it across all your Node.js projects.

## Usage

After installing, you can run your app using:

```bash
nodemon app.js
```

This starts your app and watches for any file changes. If it detects changes, it restarts the app automatically.


## Key Points:

* `nodemon` will **not** be installed inside your project directory.
* It is installed **globally** on your operating system, meaning it can be used in any project.
* It does **not** modify your `package.json` file.
* It will **not** appear under the `dependencies` or `devDependencies` sections.
* It's a tool used to run your code, not a library required by your code.


## Summary

* Use global installs for tools, not libraries.
* `nodemon` helps automate restarting your app on code changes.
* Installing it globally gives you access to the `nodemon` command in any terminal session.