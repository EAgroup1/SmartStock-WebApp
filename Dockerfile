FROM node:14

WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
# Create app directory
WORKDIR /usr/src/app/backend
RUN npm install
RUN npm -version

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./backend/package*.json ./

WORKDIR /usr/src/app/backend

# If you are building your code for production
RUN npm ci --only=production

RUN npm run build

# Bundle app source
EXPOSE 3000
EXPOSE 4000
#CMD [ "node", "./build/src/server.js" ]
CMD [ "npm", "run", "start" ]
