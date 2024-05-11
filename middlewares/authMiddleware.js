const jwt = require('jsonwebtoken');

async function authenticateToken(req, reply) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    reply.code(401).send({ message: 'Unauthorized' });
    return;
  }
  jwt.verify(token, 'qweqweqwe', (err, user) => {
    if (err) {
      reply.code(403).send({ message: 'Forbidden' });
      return;
    }
    req.user = user;
  });
}

module.exports = { authenticateToken };
