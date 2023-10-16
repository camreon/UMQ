# react build
FROM node:20 as build 

WORKDIR /umq-web
COPY /umq-web/package*.json ./
COPY /umq-web/yarn.lock ./
RUN yarn install
COPY /umq-web .
RUN yarn run build


# nginx and flask setup
FROM tiangolo/uwsgi-nginx-flask:python3.10

COPY --from=build /umq-web/build /usr/share/nginx/html

COPY app/requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

RUN rm /etc/uwsgi/uwsgi.ini
COPY /app/uwsgi.ini /etc/uwsgi/uwsgi.ini 
ENV UWSGI_CHEAPER 0
ENV UWSGI_PROCESSES 1

COPY /app/alembic.ini .
COPY ./app /app