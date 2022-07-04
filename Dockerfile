ARG PORT=5858

FROM node:16.15.1-alpine AS dev_dependencies
WORKDIR /usr/src/import-cnab/
COPY ./src ./src
COPY package*.json tsconfig.json ./
RUN npm install 

FROM node:16.15.1-alpine AS dependencies
WORKDIR /usr/src/import-cnab/
COPY package*.json ./
COPY ./src ./src
RUN npm install --prod

FROM node:16.15.1-alpine AS build
WORKDIR /usr/src/import-cnab/
COPY --from=dev_dependencies /usr/src/import-cnab/ .
COPY . .
RUN npm run build

FROM node:16.15.1-alpine AS runtime
USER node
ENV PATH /usr/src/import-cnab/node_modules/.bin:$PATH
ENV NODE_ENV=production
RUN apk --no-cache -U upgrade
COPY --chown=node:node --from=dependencies /app/node_modules /home/node/app/node_modules/
COPY --from=build --chown=node:node /app/dist /home/node/app/dist/
EXPOSE ${PORT}
ENTRYPOINT npm run orm migration:run && npm run seed
CMD npm start