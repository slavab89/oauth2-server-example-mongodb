# oauth2-server example with mongodb
Example for using node-oauth2-server with a mongodb backend

I'm using version 3.0.0-b3.1 of [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server) module.<br>
I've started with [node-oauth2-server-implementation](https://github.com/manjeshpv/node-oauth2-server-implementation) example and changed it to work with the latest version of [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server)<br>
I modified it while reading the code in the module itself and trying to integrate it to work better - While also making it ES2016 ;)

## Instructions
The first thing you need to do (Other than having mongodb running) is to create a user and a client. <br>
I've hooked up very simple routes for that

Create a user:
```bash
curl -X POST -H "Content-Type: application/json" -d '{ "username": "admin", "password": "admin", "scope": "profile" }' "http://localhost:8000/users/"
```

Example of a client creation (Will generate a client_id and client_secret):
```bash
curl -X POST -H "Content-Type: application/json" -d '{ "user": "58c034da09d909d85c515537", "name": "admin", "redirectUris": ["http://localhost:8000/oauth/callback"] }' "http://localhost:8000/clients"
```

Now you can play around with the different types of requests to get access_tokens.

## Model
The main thing that works with [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server) is the [model](./model.js) file.
Feel free to remove all the console.logs - they are just for convinience and testing.

I 'disabled' the validateScope and verifyScope functions as i have yet to start working with them.

It is possible to create the generate* functions if you like to create tokens by yourself (JWT or something like that)

## oauthServerMiddlewares
This is a file that contains the middlewares themselves and initiates the work with the oauth-server
