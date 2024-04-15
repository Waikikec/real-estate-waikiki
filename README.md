# Javascript Web Module November 2021 SoftUni

![MERN](https://raw.githubusercontent.com/miles-till/easy-mern-stack/master/media/mern.png)

# Contents

- [Screenshots](#Screenshots)
- [Quick Start](#quick-start)
  - [Configure](#configure)
  - [Run](#run)
- [NPM Scripts (package.json)](#npm-scripts-package.json)
- [Client](#client)
- [Server](#server)
- [Socket](#socket)
- [Development Tools](#development-tools)
- [License](#license)

# Screenshots


# Quick Start

## `Basic configuration`

1. Install [Node.js](https://nodejs.org/en/)
2. Install server and client packages:
   ```
   npm install
   ```
3. Follow .env.example for client and server side and create your own

4. For each folder (client-side/server-side/socket):

   ```
   npm start
   ```


# Folder Structure

```
+-- client/                # react client app
|   +-- public/                 # static resources
|   +-- src/                    # client source
|   +-- package.json            # client npm packages
|
+-- server-side/           # node web server + api
|   +-- src/                    # server source
|   +-- package.json            # server npm packages
|
+-- socket/                # bidirectional communication for notifications
|   +-- package.json            # npm packages
|
+-- README.md              # this readme file
```

# Client

- [React](https://reactjs.org/)
  - Web client
- [Axios](https://github.com/axios/axios)
  - AJAX requests

# Server

- [Node.js](https://nodejs.org/en/)
  - Server platform
- [Express](https://expressjs.com/)
  - Web server
- [MongoDB Atlas Database](https://www.mongodb.com/atlas/database)
  - Database server
- [Prisma](https://www.prisma.io/)
  - Server-side data models

# Socket
- [Socket.io](https://socket.io/)
  - Bidirectional communication

# License

This project is licensed under the `MIT open source license`.
