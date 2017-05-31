# oauth2-server example with mongodb
Example for using node-oauth2-server with a mongodb backend

I'm using version 3.0.0-b3.1 of [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server) module.<br>
I've started with [node-oauth2-server-implementation](https://github.com/manjeshpv/node-oauth2-server-implementation) example and changed it to work with the latest version of [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server)<br>
I modified it while reading the code in the module itself and trying to integrate it to work better - While also making it ES2016 ;)

## Note
OAuth2 is used for <b>authorization</b>, which is different from <b>authentication</b>. It will not let you have both user login (authentication) and service authorization (Which is what people usually want).
You will have to implement your own method of user authentication and inject that into OAuth2 flow.

If you want a combined solution, you should take a look at OpenID Connect.

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

## Request examples:

### Client credentials
```
POST /oauth/token HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret
```

### Password
```
POST /oauth/token HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64({clientId}:{clientPassword})}

grant_type=password&username={username}&password={password}
```

### Authorization Code
```
GET /oauth/authorize?response_type=code&client_id={clientId&redirect_uri=http://localhost:8000/oauth/callback&state={randomString} HTTP/1.1
Host: localhost:8000
Authorization: Bearer {access_token}
```

### Access Token (Using Authorization Code)
```
POST /oauth/token HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded

client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&code={authorization_code}&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth%2Fcallback
```

### Refresh Token
```
POST /oauth/token HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64({clientId}:{client_secret})}

grant_type=refresh_token&refresh_token={refreshToken}
```
