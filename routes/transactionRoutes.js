const transactionController = require('../controllers/transactionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

async function routes(fastify, options) {
  fastify.post('/send', {
    preHandler: authenticateToken,
    schema: {
      body: {
        type: 'object',
        properties: {
          amount: { type: 'number' },
          fromAccountId: { type: 'integer' },
          toAccountId: { type: 'integer' },
        },
        required: ['amount', 'fromAccountId', 'toAccountId'],
      },
      response: {
        201: {
          description: 'Transaction sent successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
            transaction: { type: 'object' },
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
  },
    transactionController.send);

  fastify.post('/withdraw', {
    preHandler: authenticateToken,
    schema: {
      body: {
        type: 'object',
        properties: {
          amount: { type: 'number' },
          fromAccountId: { type: 'integer' },
        },
        required: ['amount', 'fromAccountId', 'toAccountId'],
      },
      response: {
        201: {
          description: 'Transaction withdrawn successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
            transaction: { type: 'object' },
            currentBalance: { type: 'number' },
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
  }, transactionController.withdraw);

  fastify.get('/history/user', {
    preHandler: authenticateToken,
    schema: {
      response: {
        200: {
          description: 'Payment History Data',
          type: 'object',
          properties: {
            paymentHistory: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  amount: { type: 'number' },
                  timestamp: { type: 'string', format: 'date-time' },
                  status: { type: 'string' },
                  type: { type: 'string' },
                  currency: { type: 'string' },
                  recepientId: { type: 'integer' },
                  senderId: { type: 'integer' },
                  recepient: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      type: { type: 'string' },
                      userId: { type: 'integer' }
                    }
                  },
                  sender: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      type: { type: 'string' },
                      userId: { type: 'integer' }
                    }
                  }
                }
              }
            }
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
  }, transactionController.paymentHistoryPerUser);


  fastify.get('/history/account/:accountId', {
    preHandler: authenticateToken,
    schema: {
      params: {
        type: 'object',
        properties: {
          accountId: { type: 'integer' }
        },
        required: ['accountId']
      },
      response: {
        200: {
          description: 'Payment History Data',
          type: 'object',
          properties: {
            paymentHistory: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  amount: { type: 'number' },
                  timestamp: { type: 'string', format: 'date-time' },
                  status: { type: 'string' },
                  type: { type: 'string' },
                  currency: { type: 'string' },
                  recepientId: { type: 'integer' },
                  senderId: { type: 'integer' },
                  recepient: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      type: { type: 'string' },
                      userId: { type: 'integer' }
                    }
                  },
                  sender: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      type: { type: 'string' },
                      userId: { type: 'integer' }
                    }
                  }
                }
              }
            }
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
  }, transactionController.paymentHistoryPerAccount);
}

module.exports = routes;
