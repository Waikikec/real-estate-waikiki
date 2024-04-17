# Real Estate FullStack Application

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

![1](https://github.com/Waikikec/real-estate-waikiki/assets/19924074/1e2cd2b7-e77c-4428-9b43-7a6b591ee437)
![5](https://github.com/Waikikec/real-estate-waikiki/assets/19924074/c5a94223-382b-42b8-971c-0526f336a736)
![0](https://github.com/Waikikec/real-estate-waikiki/assets/19924074/470739fd-99fb-4591-8f0f-4dcd8cafe884)
![6](https://github.com/Waikikec/real-estate-waikiki/assets/19924074/3f389760-e7c9-4d7e-922f-bbe870514a03)
![2](https://github.com/Waikikec/real-estate-waikiki/assets/19924074/96c82825-752c-4ccc-a9f1-e039545e692b)



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
