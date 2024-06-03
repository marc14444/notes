FROM node

RUN npm install

ADD  . /src/

WORKDIR /src

RUN npm install

EXPOSE 3200

VOLUME /src/local/

CMD npm start
