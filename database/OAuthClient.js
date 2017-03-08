const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OAuthClientSchema = new Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  redirectUris: {
    type: [String]
  },
  grants: {
    type: [String],
    default: ['authorization_code', 'password', 'refresh_token', 'client_credentials']
  },
  scope: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);
