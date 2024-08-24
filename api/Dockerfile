FROM node:22-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# Add CorePack and Install Yarn 4
RUN corepack enable && corepack prepare yarn@4

WORKDIR /usr/src/app
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build

#Prod API
FROM base AS runner
WORKDIR /usr/src/app
# Set Production ENV VAR
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy Over Build Files To WD
COPY --from=builder --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules

# Run The API
CMD ["node", "dist/main.js"]
