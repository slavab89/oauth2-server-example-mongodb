const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OAuthRefreshTokenSchema = new Schema({
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  client: { type: Schema.Types.ObjectId, ref: 'OAuthClient' },
});

module.exports = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);
