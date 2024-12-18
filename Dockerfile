FROM node:latest

WORKDIR /app
COPY . .

RUN npm install
RUN npm install express
RUN npm install joi
RUN npm install --save-dev babel-jest @babel/preset-env
RUN npm install --save-dev supertest

CMD ["npm", "start"]
EXPOSE 4000