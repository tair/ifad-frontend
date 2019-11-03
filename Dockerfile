FROM node:lts AS frontend

WORKDIR /frontend
COPY . .
RUN yarn
RUN yarn build

FROM alpine:latest
WORKDIR /frontend
COPY --from=frontend /frontend/build /frontend
