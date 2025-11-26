const app = require('./app')
const logger = require('./utils/loggers');

const port = process.env.PORT;

logger.info("Starting Application");

app.listen(port, () => {
  logger.info(`Server is up on port ${port}`);
});