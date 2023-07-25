## Running the app

By default, the server is listening to the [http://localhost:4000](http://localhost:4000) port. This behaviour can be configured via the [dev.env](./env/dev.env) file.

```sh
# launching database with docker-compose.yml in the root directory
docker-compose up -d database
```

```sql
/* run the following script in postresSql */
DROP TABLE IF EXISTS duty;
   CREATE TABLE duty (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description TEXT,
   completed BOOLEAN DEFAULT false,
   completedat TIMESTAMP with TIME ZONE DEFAULT NULL,
   dueat TIMESTAMP with TIME ZONE DEFAULT NULL,
   createdat TIMESTAMP with TIME ZONE DEFAULT NOW(),
   updatedat TIMESTAMP with TIME ZONE DEFAULT NOW()
);

INSERT INTO duty (title, description, completed, completedat, dueat)
VALUES
('Task 1', 'This is the description for Task 1', true, '2021-10-01T14:30:00Z', '2021-10-05T12:00:00Z'),
('Task 2', 'This is the description for Task 2', false, null, '2021-10-10 09:00:00'),
('Task 3', 'This is the description for Task 3', false, null, '2021-10-15 18:00:00');

```

### In development

To run the development server locally, you can use the bellow commands:

```sh
# Runs the current version of the server
yarn start

# Runs the current version of the server
# + watches for file changes
yarn start:dev

# Runs the current version of the server
# + watches for file changes
# + opens a debugger connection (default port 9229)
yarn start:debug
```

## Test

Nest comes with `Jest` and `Supertest` testing frameworks to ease the testing process. Here are the different test scripts which you can run:

```sh
# Runs the unit tests
yarn test

# Runs the unit test
# + watches for file changes
yarn test:watch

# Describes the test coverage
yarn test:cov
```

## Docker image

The server package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md#docker-images).
