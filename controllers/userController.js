const bcrypt = require('bcryptjs');
const User = require('../models/users');

const signUp = async (req, res, next) => {
  const { email, password } = req.body;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email in use' });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
