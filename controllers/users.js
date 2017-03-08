const db = require('../database');

const User = db.User;

module.exports.createUser = (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(() => res.json({ id: user._id }));
};
