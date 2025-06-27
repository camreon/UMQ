FROM node:22

WORKDIR /web

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

CMD ["yarn", "dev"]