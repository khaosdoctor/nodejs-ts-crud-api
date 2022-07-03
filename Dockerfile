FROM node:alpine AS builder

WORKDIR /app

COPY ./package.json ./tsconfig.json ./package-lock.json /app/
COPY ./src /app/src

RUN npm install && npm run build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/package.json/ /app/

RUN npm install --omit=dev
ENTRYPOINT [ "node", "dist/index.js" ]
