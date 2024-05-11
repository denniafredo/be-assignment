const { createAccount } = require('../services/accountService');

async function create(req, res) {
  try {
    const { type } = req.body;
    console.log(req.user);
    const account = await createAccount(req.user, type);
    res.status(201).send({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { create };
