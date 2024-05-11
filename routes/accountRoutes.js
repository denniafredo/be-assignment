const { create } = require('../controllers/accountController');
const { authenticateToken } = require('../middlewares/authMiddleware');

async function routes(fastify, options) {
  fastify.post('/create', {
    preHandler: authenticateToken,
    schema: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['Debit', 'Credit', 'Loan'] },
        },
        required: ['type'],
      },
      response: {
        201: {
          description: 'Account created successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
            account: { type: 'object' },
          },
        },
        500: {
          description: 'Internal Server Error',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, create);
}

module.exports = routes;
