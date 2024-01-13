FROM node:10
COPY ./ /channel
WORKDIR /channel
RUN npm install && npm run build:prod

FROM nginx
RUN mkdir /channel
COPY --from=0 /channel/dist /channel
COPY nginxginx.conf /etc/nginx/nginx.conf