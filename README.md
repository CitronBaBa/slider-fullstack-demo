### Project installation

**This is a mono-repo demo of a full stack React/NestJs application with Vite**

```
NestJs project is in src/packages/server
React project is in src/packages/client
src/packages/domain contains shared domain objects between the two
```

### Project installation

Once you're done with the previous steps, you can properly install the project dependencies and link the packages together:

1. Basic requirements to run the repository:

   - [Node.js](https://nodejs.org/en/): The recommended way is via [`nvm`](https://github.com/nvm-sh/nvm). You can then install the version used for this project:
     ```sh
     nvm install 16.16.0
     ```
   - [Yarn](https://classic.yarnpkg.com/): If you have `nvm` installed, you'd prefer to install `yarn` without the node dependency. To do so, the `bash` install is the easiest:
     ```sh
     curl -o- -L https://yarnpkg.com/install.sh | bash
     ```

   > As the boilerplate makes use of the yarn workspaces, you shouldn't use `npm`.

2. Install dependencies with the classic:

   ```sh
   yarn install
   ```

   > This will install all package dependencies in a common `node_modules` folder at the root of the project using a single `yarn.lock` file to avoid conflicting dependencies. The internal dependencies will be replaced by symbolic links to the corresponding packages.

3. Finally, in order to have the "common" packages (`lib` and `domain`) built so they can be used by both the `server` and the `client`, run:

   ```sh
   yarn build:common
   ```

   Or if you want the common packages to be **watched for file changes**, you can run:

   ```sh
   yarn start:common
   ```

#### Note about subsequent installations

When you want to add new dependencies to any of the packages, you can either:

- Run `yarn add <new-package1> <new-package2>` in the corresponding package folder.
- Or run `yarn workspace <YOUR_PACKAGE_NAME> add <new-package1> <new-package2>` from the root folder.

### Development & Builds

See each package's README to learn more about its development and build scripts:

- [Client](./packages/client/README.md)

- [Server](./packages/server/README.md)
