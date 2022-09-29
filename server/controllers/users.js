const User = require('../models/user');

const getUser = async (req, res) => {

  const { email, password } = req.body;



  const foundEmail = await User.findOne({ email });
  const foundPassword = await User.findOne({ password });


  if (foundEmail && foundPassword) {
    return res.status(200).json(foundEmail);
  } else {
    return res.status(200).json({ message: 'user does not exist' });
  }

}

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return res.status(400).json({ message: 'user already exists' });
  }

  const result = await User.create({ name: `${firstName} ${lastName}`, email, password });
  res.status(200).json({ message: 'user created' })
}


const deleteUser = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'please add id' });
    return;
  }
  const foundUser = await user.findById(req.params.id);
  await foundUser.remove();

  res.status(200).json({ id: req.params.id });
}


module.exports = {
  getUser,
  createUser,
  deleteUser,
}