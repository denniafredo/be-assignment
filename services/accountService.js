const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAccount(user, type) {
  try {
    const userIsExist = await prisma.user.findUnique({ where: { id: user.userId } });
    if (!userIsExist) {
      throw new Error('User not found');
    }

    const accountIsExist = await prisma.paymentAccount.findFirst({ where: { userId: user.userId, type: type } });
    if (accountIsExist) {
      throw new Error('Account already exist');
    }

    const account = await prisma.paymentAccount.create({
      data: {
        type,
        user: { connect: { id: user.userId } }
      },
    });

    return account;
  } catch (error) {
    throw new Error('Failed to create account: ' + error.message);
  }
}

module.exports = { createAccount };