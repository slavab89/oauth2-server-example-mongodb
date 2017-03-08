const OauthServer = require('oauth2-server');
const model = require('./model');

const oauth = new OauthServer({ model });
const Request = OauthServer.Request;
const Response = OauthServer.Response;

/*
  TODO: Use this authenticateHandler to authenticate the user by other means
  https://github.com/oauthjs/node-oauth2-server/issues/314
  https://github.com/oauthjs/node-oauth2-server/issues/264
*/
const authenticateHandler = {
  handle(req, res) {
    // get authenticated user or return falsy value, e.g.:
    return req.session.user;
  }
};

module.exports.token = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.token(request, response)
    .then((token) => {
      console.log('generated token data', token);
      res.set(response.headers);
      res.json(response.body);
    }).catch(err => next(err));
};

module.exports.authorize = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.authorize(request, response).then((authorizationCode) => {
    // TODO: Here i get a redirect response
    console.log(authorizationCode);
    res.status(response.status).set(response.headers).end();
  }).catch(err => next(err));
};

module.exports.authenticate = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.authenticate(request, response)
    .then((token) => {
      console.log('token data', token)
      // Request is authorized.
      Object.assign(req, { user: token });
      next();
    })
    .catch(err => next(err));
};
