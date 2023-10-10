# react app setup
FROM node:20 as build 

WORKDIR /umq-web
COPY /umq-web/package*.json ./
RUN yarn install
COPY /umq-web .
RUN yarn run build

# flask app setup
FROM tiangolo/uwsgi-nginx:python3.10
COPY ./config/nginx.conf.erb /etc/nginx/nginx.conf
COPY --from=build /umq-web/build /usr/share/nginx/html

COPY umq/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY ./umq /app
