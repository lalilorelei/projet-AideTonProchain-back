module.exports.register = User => async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.connexion = User => async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.email,
      req.body.password,
      User,
    );

    res.send({ user });
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.profil = User => async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.profil_update = User => async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstname', 'lastname', 'username', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).send();
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
