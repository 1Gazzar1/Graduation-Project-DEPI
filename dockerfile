FROM nginx:stable-alpine3.21-perl

COPY ./dist /usr/share/nginx/html

