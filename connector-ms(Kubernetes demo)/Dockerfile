# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY --chown=node package*.json ./

# Install app dependencies
COPY package.json /home/node/app

RUN npm install

# Bundle app source code
# COPY --chown=node . .
COPY . /home/node/app

COPY --chown=node:node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=4000

EXPOSE ${PORT}
CMD [ "node", "." ]

