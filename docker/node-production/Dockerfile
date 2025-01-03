# Pin the Node. js version for all stages.
FROM node:22-slim AS base

# Efficient build stage caching: re-install dependencies
# only if package. json or package-lock. json files changed.
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the app using the dependencies from the previous stage.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# !! DON'T FORGET to add node_modules to your •dockerignore file. !! 
# !! Otherwise, you'll replace the deps stage's node_modules here !!
COPY . .
RUN npm run build

# Runtime stage: copy only the "bundled" app folder
# to a "scratch" runtime stage and always use a non-root USER.
FROM base AS runtime
WORKDIR /app
USER node:node
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# Avoid using CMD ["npm", "start"] - npm is for dev & build time.
CMD ["node", "server.js"]