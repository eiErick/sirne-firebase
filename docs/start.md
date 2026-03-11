# Development Scripts Guide

This project provides several **npm scripts** to simplify building, running, and deploying the applications inside the workspace. Instead of typing long Angular CLI commands, you can use these predefined commands.

All commands should be executed from the **root of the project**.

---

# Prerequisites

Before running any script, make sure the following tools are installed:

* **Node.js**
* **npm**
* Angular CLI (optional globally, since `npx` is used)

Install dependencies:

```bash
npm install
```

---

# Running the Applications

This workspace contains two main applications:

* **sirne**
* **maraskin**

Each can be started independently.

## Run Sirne

```bash
npm run sirne
```

This command starts the **sirne** development server.

Default address:

```
http://localhost:4200
```

---

## Run Maraskin

```bash
npm run maraskin
```

This starts the **maraskin** development server.

Default address:

```
http://localhost:4100
```

---

# Library Development

The project also contains internal libraries used by the applications.

## Watch Sibella Library

```bash
npm run sibella
```

This command runs a **watch build** for the `sibella` library.

Whenever a file inside the library changes, Angular will **automatically rebuild it**.

This is useful while developing the library together with the applications.

---

# Build Commands

## Standard Build

```bash
npm run build
```

Builds the Angular project using the default configuration.

---

## Development Watch Build

```bash
npm run watch
```

Runs the build process in **watch mode** using the **development configuration**.
The project will automatically rebuild whenever files change.

---

## Full Project Build Script

```bash
npm run build:app
```

Runs the custom `build.sh` script.
This script may coordinate multiple builds or steps required by the workspace.

---

# Testing

Run unit tests with:

```bash
npm run test
```

This executes the Angular testing suite.

---

# Deploying to GitHub Pages

To build the project and deploy it to GitHub Pages:

```bash
npm run build:ghpages
```

This command will:

1. Build the **sirne** project in **production mode**
2. Set the base URL to the GitHub Pages repository
3. Deploy the generated files to GitHub Pages using `angular-cli-ghpages`

After deployment the project will be available at:

```
https://eierick.github.io/sirne-firebase/
```

---

# Direct Angular CLI Access

You can also run Angular CLI commands directly through npm:

```bash
npm run ng
```

Example:

```bash
npm run ng build
npm run ng generate component example
```

---

# Typical Development Workflow

A common workflow while developing the project:

```bash
npm install
npm run sibella
npm run sirne
```

or in another terminal:

```bash
npm run maraskin
```

This allows you to:

* Automatically rebuild the library
* Run the applications locally
* See changes instantly during development.

---

# Troubleshooting

### Port Already in Use

If a port is already being used, stop the running server or change the port in the script.

Example:

```bash
ng s --port 4300 --project=sirne
```

---

### Node Modules Problems

If the project fails to start:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

# Summary

These scripts exist to make development easier:

| Command                 | Purpose                             |
| ----------------------- | ----------------------------------- |
| `npm run sirne`         | Run Sirne dev server                |
| `npm run maraskin`      | Run Maraskin dev server             |
| `npm run sibella`       | Watch build for the Sibella library |
| `npm run build`         | Standard Angular build              |
| `npm run watch`         | Development watch build             |
| `npm run build:app`     | Custom build script                 |
| `npm run build:ghpages` | Deploy Sirne to GitHub Pages        |
| `npm run test`          | Run tests                           |

Using these scripts keeps development consistent across the team.
