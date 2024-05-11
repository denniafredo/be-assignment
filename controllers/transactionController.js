const { sendTransaction, withdrawTransaction, getPaymentHistoryPerUser, getPaymentHistoryPerAccount } = require('../services/transactionService');

async function send(req, res) {
  try {
    const { amount, toAccountId, fromAccountId } = req.body;
    const transaction = await sendTransaction(req.user, amount, toAccountId, fromAccountId);
    res.send({ message: 'Transaction sent successfully', transaction });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function withdraw(req, res) {
  try {
    const { amount, fromAccountId } = req.body;
    const transaction = await withdrawTransaction(req.user, amount, fromAccountId);
    res.send({ message: 'Transaction withdrawn successfully', transaction });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function paymentHistoryPerUser(req, res) {
  try {
    const paymentHistory = await getPaymentHistoryPerUser(req.user);
    res.send({ paymentHistory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function paymentHistoryPerAccount(req, res) {
  try {
    const { accountId } = req.params;

    const paymentHistory = await getPaymentHistoryPerAccount(parseInt(accountId));
    res.send({ paymentHistory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = { send, withdraw, paymentHistoryPerUser, paymentHistoryPerAccount };
