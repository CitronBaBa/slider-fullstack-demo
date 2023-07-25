# Builder
FROM node:16-alpine as builder

# Copy server and domain packages
WORKDIR /usr/src/fullstack-demo/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY scripts/fix-common-package-exports.sh scripts/fix-common-package-exports.sh

COPY packages/server packages/server
COPY packages/domain packages/domain

# Install domain + server dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build common packages
RUN yarn build:common

# Build server then
WORKDIR /usr/src/fullstack-demo/packages/server
RUN yarn build

# Runner
FROM node:16-alpine AS runner

WORKDIR /usr/src/fullstack-demo
COPY VERSION .

# Copy the dist builds from builder
COPY --from=builder /usr/src/fullstack-demo/package.json .
COPY --from=builder /usr/src/fullstack-demo/yarn.lock .
COPY --from=builder /usr/src/fullstack-demo/tsconfig.json .

COPY --from=builder /usr/src/fullstack-demo/packages/domain/package.json packages/domain/package.json
COPY --from=builder /usr/src/fullstack-demo/packages/domain/dist packages/domain/dist

COPY --from=builder /usr/src/fullstack-demo/packages/server/package.json packages/server/package.json
COPY --from=builder /usr/src/fullstack-demo/packages/server/dist packages/server/dist

# Install production dependencies
RUN yarn install --pure-lockfile --non-interactive --production

# Move to the server app
WORKDIR /usr/src/fullstack-demo/packages/server

# Set the correct ownership for the app folder
RUN chown -R node:node /usr/src/fullstack-demo/packages/server/

# Launch the server with container
ARG NODE_ENV=production
CMD ["yarn", "start:prod"]
