FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build 

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node ./app/node_modules ./node_modules
COPY --chown=node:node package.json .
ENV PORT 8080
EXPOSE 8080
CMD ["node","build"]