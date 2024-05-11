// authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userIsExist = await prisma.user.findUnique({ where: { username } });
  if (userIsExist) {
    throw new Error('User Is Exist');
  }
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  return user;
}

async function loginUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error('User not found');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }
  const token = generateToken(user);
  return token;
}

function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, 'qweqweqwe', { expiresIn: '1h' });
}

module.exports = { registerUser, loginUser };
