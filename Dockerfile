# base image
FROM node:latest

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN apt install mongodb-server-core
RUN npm install
RUN npm install -g @angular/cli
RUN npm install @angular/material @angular/cdk @angular/animations
RUN npm install hammerjs
RUN npm install gitignore-to-dockerignore
RUN npm install rxjs-compat
RUN npm install ng2-slim-loading-bar 

#BACKEND DEPENDENCIES
RUN cd backend && npm install dotenv express body-parser cors nodemon copy-assets shelljs typescript rimraf tslint npm-run-all node ts-node @types/shelljs @types/mongoose @types/dotenv bcrypt @types/bcrypt uuid @types/uuid && cd ../


# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
