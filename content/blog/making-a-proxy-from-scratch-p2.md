---
title: "Making a Proxy frontend from scratch"
description: "A guide to making a proxy frontend from scratch"
series:
    title: Making a proxy frontend from scratch
    part: 2
---

# Making a proxy frontend from scratch (Part 2)

---

Welcome to my guide on creating a proxy frontend from scratch! This is the second part of this guide!
You can find part one [here](./making-a-proxy-from-scratch-p1)

---

- This part is going to go through the 3 things:
  - Basic frontend creation
  - Installation and explanation of [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)
  - Installation and explanation of [Bare Mux (V2 only)](https://github.com/mercuryworkshop/bare-mux)
  - Usage of Ultraviolet

## Prerequisites

- [Node.js](https://nodejs.org/en) (Version: 21 or later) & [NPM](https://npmjs.com) (this should be installed alongside Node.js)
- You need to read [Part 1](./making-a-proxy-from-scratch-p1) of this guide

---

## Frontend

- We need to setup a basic frontend for everything to work. Let's start doing that now.

1. Install all of these packages
```bash
npm i @mercuryworkshop/bare-mux @mercuryworkshop/epoxy-transport @titaniumnetwork-dev/ultraviolet
```

- Don't worry about what these packages do for now, we'll see what they do later.

2. Create a folder called `public` in your project. (You can name this folder whatever you want just remember the name for later!)

Example command using Linux & the terminal:
```bash
mkdir public/
```

3. Create a file called `index.html` in the `public` folder.

Example command using Linux & the terminal:
```bash
touch public/index.html
```

4. Now let's edit the file! Use whatever text editor you prefer. 

Example command using Linux, the terminal & vim:
```bash
cd public/ && vim index.html
```

The file *should* be blank. Let's add some content!
```html
<!DOCTYPE html>
<html>
    <head>
        <!-- Basic boilerplate nothing interesting going on here -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title> Prism </title>
        <!-- End basic boilerplate -->
        <style>
            /** Basic CSS boilerplate **/
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                width: 100%;
                height: 100vh;
            }
            /** End basic CSS boilerplate **/

            /** add the "dnone" class (display none) **/
            .dnone {
                display: none;
                visibility: hidden;
                width: 0%;
                height: 0%;
            }

            /** Style the "main" div **/
            #main {
                width: 100%;
                height: 100%;
                background: black;
                display: flex;
                flex-direction: column;
                gap: 2rem;
                justify-content: center;
                align-items: center;
            }

            /** Style the title **/
            #title {
                color: white;
                font-weight: 900;
                font-size: 4rem;
            }

            /** Style the description **/
            #description {
                color: white;
                font-weight: 200;
                opacity: 0.75;
            }

            /** Style the input (address bar) **/
            #address {
                width: 30rem;
                height: 4rem;
                background: #33001a;
                color: white;
                outline: none;
                border: none;
                padding: 14px;
                font-size: 1rem;
                font-weight: 900;
                border-radius: 1rem;
            }

            /** Style the iframe **/
            #frame {
                width: 100%;
                height: 100%;
                /** Set position to absolute. This allows us to open the iframe ON TOP of everything **/
                position: absolute;
                top: 0;
                bottom: 0;
                background: black;
                outline: none;
                border: none;
            }
        </style>
    </head>
    <body>
        <div id="main">
            <!-- Title -->
            <h1 id="title"> Prism </h1>
            <!-- Description -->
            <p id="description"> A barebones example from MotorTruck1221's guide "Creating a proxy frontend from scratch" </p>
            <!-- Search bar -->
            <input id="address" type="text" placeholder="Search..." />
            <!-- iframe where the content will be loaded -->
            <iframe id="frame" class="dnone"></iframe>
        </div>
    </body>
</html>
```

5. Now let's get the server to send the frontend *instead* of just the basic "Hello world!" response.

Delete these lines:
```js
//basic hello world. We will change this later!
app.get('/', (req, res) => {
    //send a response of hello world!
    res.send('Hello World!');
});
```

Add these lines in place of it:
```js
import { path } from 'node:path'; // ADD this at the TOP of the file!! NOT here!

app.use(express.static(path.join(import.meta.dirname, "public" /* This is the folder you created with the index.html file in it */)));
```

The final example should look like this:
```js
//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path'; // we JUST imported this!

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "public" /* This is the folder you created with the index.html file in it */))); // We JUST added this line

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

6. And finally, let's add a script to our `package.json` file to start the server easier:
```jsonc
"scripts": {
    "start": "node index.js"
}
```

The final example should look like this:
```jsonc
{
  "name": "prism",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js", // THIS IS THE LINE WE ADDED
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "AGPL-3.0-only",
  "dependencies": {
    "express": "^4.19.2",
    "wisp-server-node": "^1.1.3"
  }
}
```

Now let's get onto adding Ultraviolet!

---

## Ultraviolet

### Explantion

- Firstly we need to understand *how* something like Ultraviolet works. Let's take our previous chart for example:

![Server flow chart](/blogs/frontend-scratch/server-flow-p1.png)

- We understand how that works right? Let's expand on it! Here's our new flow chart:

![Server flow chart (new)](/blogs/frontend-scratch/server-flow-p2.png)

- Whoah! That's a lot of new stuff right? Let's break it down.

1. First you the browser (in white in the diagram), commonly referred to as the client makes a basic request. The server (also in white in the diagram) then sends the basic frontend we wrote to you.
2. Once we receive the frontend, we install a service worker (Ulraviolet, in green in the diagram).
3. Once the service worker is ready, we set a transport (don't worry too much about what this is it'll be explained later). This transport then sends a "continue" packet (Wisp packet, the color red in the diagram).
4. As soon as the client (you or anyone else) types in a URL, we encode the URL with [XOR](https://www.techopedia.com/definition/3472/exclusive-or-xor) and send a request to the service worker.
5. The service worker (in green in the diagram), starts to communicate using the transport. This performs a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) to create an encrypted (the color orange in the diagram) connection.
6. The service worker makes an encrypted (the color orange in the diagram) request, and as soon as the service worker receives the response, it rewrited **all url's**. For example:
    - All CSS urls:
    ```css
    @import "url here"
    ```
    - All urls found in the HTML:
    ```html
    <script src="https://thescripthere"></script>
    ```
    - And the JavaScript urls (this is the difficult part) eg:
    ```js
    window.location
    ```
7. This rewritten content is then what you see.

- But why does the content need to be rewritten?
- It needs to be rewritten as if it wasn't, you would be getting the data *directly* from the actual website *instead* of getting it through the proxy. That wouldn't be very good if the site was blocked now would it?

- Previously, everything we did wasn't encrypted. This allowed a site owner to hijack the requests and see everything on the server. (Kinda scary isn't it?).

- ***NOTE: this is a very simple explanation. It is NOT all extensive***

### Implementing Ultraviolet.

- Ok enough explaning, let's get to adding Ultraviolet!

1. First, we need to add some things to our `index.js` file. Add these lines to the file ***below where we serve our public folder***:
```js
import { uvPath } from "@titaniumnetwork-dev/ultraviolet"; // ADD THIS TO THE TOP OF THE FILE!!!!

// "/uv/" is where the uv files will be available from. uvPath is just where those files are located
app.use("/uv/", express.static(uvPath));
```

The final code should look like this:
```js
//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "public" /* This is the folder you created with the index.html file in it */)));

// "/uv/" is where the uv files will be available from. uvPath is just where those files are located
app.use("/uv/", express.static(uvPath));

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

2. Now we need to create one new folder called `uv` ***(it has to be named UV!)*** in our `public` folder.
Example with the terminal in Linux:
```bash
mkdir public/uv/
```

3. Now, let's add a file in that folder called `uv.config.js`
Example using Linux & the terminal:
```bash
touch public/uv/uv.config.js
```

4. Add the following content to that file:
```js
self.__uv$config = {
  // The prefix is where we "intercept" the request. 
  prefix: "/uv/service/",
  //where Ultraviolet encodes & decodes the urls.
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  //extra UV stuff
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
```

5. Add the following code to the `<head>` of your `index.html` file:
```html
<!-- The UV bundle. It contains most of the code for ultraviolet to function properly -->
<script src="uv/uv.bundle.js" defer></script>
<!-- The uv.config.js file we just made. -->
<script src="uv/uv.config.js" defer></script>
```

6. Now we need to register Ultraviolet in a service worker. Let's create another file called sw.js in our `public` folder.
Example with the terminal in Linux:
```bash
touch public/sw.js
```

7. Now, let's edit that file and add the following content:
```js
//The UV bundle. It contains most of the code for ultraviolet to function properly.
importScripts('/uv/uv.bundle.js');
//our uv.config.js that we just made a few steps ago
importScripts('/uv/uv.config.js');
//the actual Ultraviolet service worker. Needed for UV to function properly.
importScripts(__uv$config.sw || '/uv/uv.sw.js');

//create the uv service worker
const uv = new UVServiceWorker();

//listen for when things are requested.
self.addEventListener('fetch', function (event) {
    //If the request starts with the websites origin (eg. https://localhost:8080) and the uv prefix (/uv/service), then proxy the request.
    if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        //respond (proxy) the request
        event.respondWith(
            (async function () {
                return await uv.fetch(event);
            })()
        );
    }
    //if it doesn't start with the origin and prefix, just get the stuff normally.
    else {
        event.respondWith(
            (async function() {
                return await fetch(event.request);
            })()
        );
    }
});
```

8. In your `index.html` file add this to the bottom of the `<body>` to get the service worker to register:
```html
<script>
    async function regSW() {
        //if the service worker doesn't exist throw an error
        if (!navigator.serviceWorker) {
            throw new Error("Your browser doesn't support service workers.");
        }
        //register the service worker. (We just made that file!)
        await navigator.serviceWorker.register("/sw.js");
    }
    regSW();
</script>
```

- ***CHALLENGE: extract the code above into it's own file!***

9. Voila! Ultraviolet is now added and working (ish). Let's move onto the next step.

---

## Setting up Bare Mux

### Explanation

### Setup

- What is Bare Mux?
- Bare Mux allows us to set and use a "transport" (this will be explained later) in Ultraviolet.

1. Edit your `index.js` to include the following:
```js
//IMPORT THIS AT THE TOP OF THE FILE:
import { baremuxPath } from "@mercuryworkshop/bare-mux/node"; //Note how we are using /node ath the end of this import. This provides correct types when using TypeScript
//
// "/baremux/" is where the bare-mux files will be available from. bareMuxPath is just where those files are located.
app.use("/baremux/", express.static(baremuxPath));
```
Your full file should look something like this:
```js
//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node"; //Note how we are using /node at the end of this import. This provides the correct types when using TypeScript.

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "public" /* This is the folder you created with the index.html file in it */)));

// "/uv/" is where the uv files will be available from. uvPath is just where those files are located
app.use("/uv/", express.static(uvPath));
// "/baremux/" is where the bare-mux files will be available from. baremuxPath is just where those files are located
app.use("/baremux/", express.static(baremuxPath));

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

2. Add the following to the `<head>` tag:
```html
<!-- BareMux content -->
<script src="baremux/index.js" defer></script>
```

3. Now, let's create the inital bare-mux connection. Remember that `<script>` tag at the bottom of the body in your `index.html`? Add this to it:
```js
//function for ease of use
async function setTransport() {
    //create a new bare mux connection
    const conn = new BareMux.BareMuxConnection("/baremux/worker.js")
}
```

4. Voila! Bare Mux is now setup let's move onto the next step:

---

## Setting up a Transport.

### Explanation

- What is a "transport"?
- A "transport" in this sense is a program that allows Bare Mux to "transport" a request to the server. Most of them, allow you to encrypt traffic (via [TLS](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) using [WASM](https://developer.mozilla.org/en-US/docs/WebAssembly) and utilizes Wisp.
- There are currently at the time of writing 3 transports:
  - [Epoxy](https://github.com/mercuryworkshop/epoxy-tls) (Smallest size, fast, mostly stable, what we will be using).
  - [libcurl.js](https://github.com/ading2210/libcurl.js) (Slightly better browser compatibility (Firefox), more features)
  - And [Bare as Module 3](https://github.com/mercuryworkshop/bare-as-module3) (Legacy, unencrypted, doesn't use Wisp, ***NOT RECOMMENDED***)
- We are going to use [Epoxy](https://github.com/mercuryworkshop/epoxy-tls)

### Setup:

1. Edit your `index.js` with the following:
```js
//IMPORT THIS AT THE TOP OF THE FILE:
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
//
// "/epoxy/" is where the epoxy files will be served from. epoxyPath is just the location to those files.
app.use("/epoxy/", express.static(epoxyPath));
```
The final code should looks something like this:
```js
//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node"; //Note how we are using /node at the end of this import. This provides the correct types when using TypeScript.
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "public" /* This is the folder you created with the index.html file in it */)));

// "/uv/" is where the uv files will be available from. uvPath is just where those files are located
app.use("/uv/", express.static(uvPath));
// "/baremux/" is where the bare-mux files will be available from. baremuxPath is just where those files are located
app.use("/baremux/", express.static(baremuxPath));
// "/epoxy/" is where the epoxy files will be served from. epoxyPath is just the location to those files.
app.use("/epoxy/", express.static(epoxyPath));

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

2. Remember that function called `setTransport`? Let's *actually* set a transport! Add the following lines in that function:
```js
//If you are using http:// change it to ws:// or if using https:// change it to wss://, get the domain name and add "/wisp/" to the end of it
const wispUrl = (location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/wisp/";

//actually set the transport!!
await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl /* We just set this url! */ }]);
```
The final function should look something like this:
```js
async function setTransport() {
    //create a new bare mux connection
    const conn = new BareMux.BareMuxConnection("/baremux/worker.js");
    //If you are using http:// change it to ws:// or if using https:// change it to wss://, get the domain name and add "/wisp/" to the end of it
    const wispUrl = (location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/wisp/";
    //actually set the transport!!
    await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl /* We just set this url! */ }]);
}
```

The final `<script>` tag should look like this:
```html
<script>
    async function regSW() {
        //if the service worker doesn't exist throw an error
        if (!navigator.serviceWorker) {
            throw new Error("Your browser doesn't support service workers.");
        }
        //register the service worker. (We just made that file!)
        await navigator.serviceWorker.register("/sw.js");
    }
    regSW();
    //function for ease of use
    async function setTransport() {
        //create a new bare mux connection
        const conn = new BareMux.BareMuxConnection("/baremux/worker.js");
        //If you are using http:// change it to ws:// or if using https:// change it to wss://, get the domain name and add "/wisp/" to the end of it
        const wispUrl = (location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/wisp/";
        //actually set the transport!!
        await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl /* We just set this url! */ }]);
    }
</script>
```

- ***CHALLENGE: extract those functions into their own files!***

- *Phew* that's a lot of stuff to do! Let's move on to the final step:

---

## Using Ultraviolet

1. Let's create a new function in our `<script>` tag called `proxy`
```js
//new function, pass in the url so we can actually proxy it!
async function proxy(url) {
    //get the iframe!
    const iframe = document.getElementById("frame");
    //create the initial url with ultraviolet
    const uvUrl = __uv$config.prefix /* The prefix set in the config */ + __uv$config.encodeUrl(url) /* Encode the url with XOR */
    //call our setTransport function
    await setTransport();
    //remove the "dnone" class so the iframe is visible.
    iframe.classList.remove("dnone");
    //set the iframe's source to the initial url
    iframe.src = uvUrl;
}
```

2. Now, in the same `<script>` tag we need to listen for when the user hit's enter on our search box!
```js
//listen for keypresses in the address bar
document.getElementById("address").addEventListener("keypress", function (event) {
    //if it's the enter key, proxy the url!
    if (event.key === "Enter") {
        //call our proxy function with the url they entered
        proxy(document.getElementById("address").value /* The value the user has entered */)
    }
})
```

3. After adding this, you might notice that the user has to enter a full url instead of just being able to search something. So, how do we fix this? We add another function of course. Let's call it `search`.
```js
//new function to allow a user to be able to search intead of having to type in a full url
function search(key /* the user's value */, template /* the search engine template to use */) {
    try {
        //if the entered a full url! Continue on
        return new URL(key).toString();
    } catch (error) { /* ignore errors */ }
    try {
        //if the entered value is a full URL when adding http:// or https:// in front of it, add http:// and the continue.
        const url = new URL(`http://${key}`);
        //we also have to make sure it is an actual domain!
        if (url.hostname.includes('.')) return url.toString();
    } catch (error) { /* Ignore the errors */ }
    //if the above doesn't pass, add the entered value to a search template and the continue.
    return template.replace("%s", encodeURIComponent(key));
}
```

4. Now let's make that function work with our proxy function! Change this line from:
```js
const uvUrl = __uv$config.prefix /* The prefix set in the config */ + __uv$config.encodeUrl(url) /* Encode the url with XOR */
```
To:
```js
const uvUrl = __uv$config.prefix /* The prefix set in the config */ + __uv$config.encodeUrl(/* Our search function! */ search(url, "https://www.google.com/search?q=%s" /* the search engine template. Feel free to change it to whatever search engine you want (just make sure to add %s add the end!) */)) /* Encode the url with XOR */
```

5. Now the user can search without having to enter a full URL!

---

## Ending

- *phew!* That was tons and tons of steps wasn't it? Let's recap what we did:
  - We created a basic frontend using only basic HTML & some CSS
  - We installed, explained and added Ultraviolet.
  - We setup Bare Mux & properly set the transport.
  - We used Ultraviolet & setup some cool extra things (like our `search` function) for a better use experience.
- With the knowledge you gained from this, I hope you go out and make something cool with it!
- I have made the [Example Repo](https://github.com/motortruck1221/prism) a template! All you have to do is click the "Use this template button"!
- The part 2 files can be located [here](https://github.com/MotorTruck1221/prism/tree/b580c044f75618c251306e4688af2dac079a9cab)
