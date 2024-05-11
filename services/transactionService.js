const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function sendTransaction(user, amount, toAccountId, fromAccountId) {
  try {
    const fromAccountIdIsExist = await prisma.paymentAccount.findFirst({
      where: { id: fromAccountId, userId: user.userId },
    });
    if (!fromAccountIdIsExist) {
      throw new Error('Sender account not found');
    }

    const toAccountIdIsExist = await prisma.paymentAccount.findFirst({
      where: { id: toAccountId },
    });
    if (!toAccountIdIsExist) {
      throw new Error('Recepients account not found');
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        recepientId: toAccountId,
        senderId: fromAccountId,
        currency: 'USD',
        type: 'transfer',
        status: 'pending',
      },
      include: {
        recepient: true,
        sender: true,
      },
    });

    await processTransaction(transaction);

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: 'completed' },
    });

    return updatedTransaction;
  } catch (error) {
    throw new Error('Failed to send transaction: ' + error.message);
  }
}

async function withdrawTransaction(user, amount, fromAccountId) {
  try {
    const account = await prisma.paymentAccount.findUnique({
      where: { id: fromAccountId, userId: user.userId },
      include: { recepient: true }
    });
    if (!account) {
      throw new Error('Account not found');
    }

    const balance = account.recepient.reduce((acc, transaction) => {
      if (transaction.status === 'completed') {
        return acc + transaction.amount;
      } else {
        return acc;
      }
    }, 0);

    if (balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: -amount,
        type: 'withdraw',
        currency: 'USD',
        status: 'completed',
        recepient: { connect: { id: fromAccountId } },
        sender: { connect: { id: fromAccountId } }
      }
    });

    await processTransaction(transaction);

    return { transaction, currentBalance: balance - amount };
  } catch (error) {
    throw new Error('Failed to withdraw transaction: ' + error.message);
  }
}


async function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Transaction processed:', transaction);
      resolve(transaction);
    }, 3000); // Simulating 30 seconds processing time
  });
}

async function getPaymentHistoryPerUser(user) {
  try {
    const paymentAccounts = await prisma.paymentAccount.findMany({
      where: { userId: user.userId }
    });

    const paymentAccountIds = paymentAccounts.map(account => account.id);

    const paymentHistory = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: { in: paymentAccountIds } },
          { recepientId: { in: paymentAccountIds } }
        ]
      },
      include: {
        recepient: true,
        sender: true
      }
    });
    return paymentHistory;
  } catch (error) {
    throw new Error('Failed to get payment history: ' + error.message);
  }
}

async function getPaymentHistoryPerAccount(accountId) {
  try {
    const paymentHistory = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: accountId },
          { recepientId: accountId }
        ]
      },
      include: {
        recepient: true,
        sender: true
      }
    });
    return paymentHistory;
  } catch (error) {
    throw new Error('Failed to get payment history: ' + error.message);
  }
}

module.exports = { sendTransaction, withdrawTransaction, getPaymentHistoryPerUser, getPaymentHistoryPerAccount };
