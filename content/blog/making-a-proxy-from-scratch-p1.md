---
title: "Making a Proxy frontend from scratch (part 1)"
description: "A guide to making a proxy frontend from scratch"
part: 1
---

# Making a proxy frontend from scratch
---

Welcome to my guide on creating a proxy frontend from scratch! This is a multi-part guide that I will write over the span of multiple days.
First I need to state what this guide *will not cover*

- Setting up and using [Masqr](https://github.com/titaniumnetwork-dev/masqrproject)/[Corlink](https://corlink.rubynetwork.co). This guide is made to be bare bones.
- Things like NGINX or any other reverse proxy
- Installing Node.js, NPM or other tools needed
- Git, or .gitignores
- Docker

This guide will cover:

- [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)
- [Bare-Mux](https://github.com/mercuryworkshop/bare-mux)
- [Epoxy](https://github.com/mercuryworkshop/epoxy-tls)
- Basic [Wisp server](https://github.com/mercuryworkshop/wisp-protocol) with [Express](https://expressjs.com)

Ok, now that we have that out of the way let's get started!

---

- This part is going to focus on getting your bare-bones [Express](https://expressjs.com) server up with [Wisp](https://github.com/mercuryworkshop/wisp-protocol).

## Prerequisites

- [Node.js](https://nodejs.org/en) & [NPM](https://npmjs.com) (this should be installed alongside Node.js)

## Explanation

First, we need to understand how the server works.

1. The server listens for all requests & upgrade requests (which are associated with websockets)
2. The server will either respond with a simple 'hello world!' (or an actual frontend) or a wisp packet if the upgrade request ends with `/wisp/`

Here is a simple flow chart:

![Server flow chart](/blogs/frontend-scratch/server-flow-p1.png)

### Scaffolding the project

1. Create your project folder. For example: Prism.
    - Example using Linux:
    ```bash
    mkdir prism/ && cd prism/
    ```
2. Init a basic node.js project (make sure you are in your project folder)
 - ```bash
    npm init -y
    ```
3. Edit the package.json to include the correct license. It should look something like this:
```jsonc
{
  "name": "prism",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", //Add this line!
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "AGPL-3.0-only" // Change this line to what you see here!
}
```
4. Install dependencies
```bash
npm i wisp-server-node express
```
5. Create an `index.js` file.
    - Example in Linux via the terminal
    ```bash
    touch index.js
    ```
6. Edit the `index.js` file to include this:
```js
//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

//basic hello world. We will change this later!
app.get('/', (req, res) => {
    //send a response of hello world!
    res.send('Hello World!');
});

//listen for requests on the http server.
httpServer.on('request', (req, res) => {
    //make express handle all of the requests
    app(req, res)
});

//listen for websocket upgrades on the http server
httpServer.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        //route the request to the wisp server if the url ends in /wisp/
        wisp.routeRequest(req, socket, head);
    }
    else {
        socket.end();
    }
});

//when the server is ready, console.log that it is ready
httpServer.on('listening', () => {
    console.log(`Server listening on http://localhost:${port}`);
});

//start the http server
httpServer.listen({
    port: port
});
```
7. Visit `http://localhost:8080` and you should see a simple `hello world!` your wisp server should also work.

---

## Ending

- I hope you have gained some decent knowledge on how to setup Wisp with Express.
- This entire project is open source and available at: https://github.com/motortruck1221/prism/
- Part 1 files can be located: [here](https://github.com/MotorTruck1221/prism/tree/f7e28e40213b9a282c06553467e74773f1c52597)
