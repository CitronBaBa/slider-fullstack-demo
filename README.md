### Short Description

**This is a mono-repo demo of a full stack React/NestJs application with Vite**

```
NestJs project is in src/packages/server
React project is in src/packages/client
src/packages/domain contains shared domain objects between the two
```

### Project installation

1. Basic requirements:

   - Install nodesjs
     ```sh
     nvm install 18.15.0
     ```
   - install yarn
     ```sh
     curl -o- -L https://yarnpkg.com/install.sh | bash
     ```
     > The repo makes use of the yarn workspaces, you shouldn't use `npm`.

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Build shared packages, run:

   ```sh
   yarn build:common

   # if need to watch file changes and build
   yarn start:common
   ```

4. start database:

   ```sh
   docker-compose up
   ```

5. run applications:

   ```sh
   # init the schema
   cd packages/server
   npx prisma migrate dev --name init

   # start server
   yarn workspace @fullstack-demo/server start:dev

   # open another shell, start client
   # note that server by default whitelist cors for localhost:8000, modify the list if using another port
   yarn workspace @fullstack-demo/client-vite start:dev
   ```

### Project Design

1. The project use a mono repo and share types or other logics in common packages.  
   The same domain typescript types can be referenced in client/server code.

2. Client & server are separate apps and communicate via cross domain requests.

_For Client_

1. Keep no interim data.  
   All edits are auto-sent to server, there is no save button

2. Use Mobx to keep states, even UI states, to allow flexibility.

3. API calls are encapsulated with default error display.

4. Use tailwindcss and daisyUI for styling.

_For Server_

1. Generic table.
   Slider is stored as component table, with the actual data in a json field.  
   This allows maximum flexiblity, as the data scheme of a slider is prone to changes.  
   This also makes room for similiar components without frequent changes to sql schema.

2. Use prisma ORM for keeping schema, type generation, migration etc.  
   schema is kept in schema.prisma

3. Use postgreSQL for better json support.  
   nosql (mongo) storage can also replace postgres, with small code changes by using prisma.

### Things to do

_For Server_

1. Add standard logging
2. Add more tests
3. Better type gymnastics with generic component

_For Client_

1. Add more tailwind class to replace arbitrary values
