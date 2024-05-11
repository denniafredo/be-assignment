const authRoutes = require('./authRoutes');
const accountRoutes = require('./accountRoutes');
const transactionRoutes = require('./transactionRoutes');

async function registerRoutes(fastify) {
  await fastify.register(authRoutes, { prefix: '/auth' });
  await fastify.register(accountRoutes, { prefix: '/account' });
  await fastify.register(transactionRoutes, { prefix: '/transaction' });
}

module.exports = registerRoutes;
