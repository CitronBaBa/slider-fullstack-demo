# React client

<img width="728" alt="Screenshot 2023-07-28 at 21 38 18" src="https://github.com/CitronBaBa/demo-fullstack-monoRepo/assets/47417423/5251cab9-2dee-42e8-9141-98d583f51e0b">
<img width="720" alt="Screenshot 2023-07-28 at 21 38 24" src="https://github.com/CitronBaBa/demo-fullstack-monoRepo/assets/47417423/2135350f-46d9-469c-9afc-3fa58836c05e">


## Running the app

By default, the webpack dev server is listening to the [http://localhost:8000](http://localhost:8000) port. This can be configured in the [vite.config.js](./vite.config.js) file, changing the `DEV_SERVER_PORT` constant.

### In development

```sh
# Runs the webpack dev server (using HMR)
yarn start:dev
```

### In production

Once you are happy with your code, you can run a production version following these steps:

1. Build a production bundle:

   ```sh
   yarn build
   ```

### Docker image

The client package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md#docker-images).
