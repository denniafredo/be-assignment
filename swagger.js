const fastifySwagger = require('fastify-swagger');

async function configureSwagger(fastify) {
  fastify.register(fastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Your API Title',
        description: 'Description of your API',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
}

module.exports = configureSwagger;
