#Build API
FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build

#Prod API
FROM node:22-alpine
WORKDIR /usr/src/app
# Set Production ENV VAR
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Copy Over Build Files To WD
COPY --from=build /user/src/app/dist ./dist
# Port For API
EXPOSE 3010
# Run The API
CMD ["node", "dist/main.js"]
