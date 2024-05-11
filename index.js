const fastify = require('fastify')({ logger: true });
const configureSwagger = require('./swagger');
const registerRoutes = require('./routes/indexRouter');

configureSwagger(fastify);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await registerRoutes(fastify);
    await fastify.listen(PORT);
    fastify.log.info(`Server listening on port ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
