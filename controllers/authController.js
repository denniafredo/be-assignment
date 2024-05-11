const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const user = await authService.registerUser(username, password);
    res.send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
}

module.exports = { register, login };
