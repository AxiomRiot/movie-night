const winston = require('winston');
const { combine, timestamp, printf } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.colorize(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss', colorize: true}),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  )
});

if( process.env.TRANSPORT === 'CONSOLE' ) {
  logger.add(new winston.transports.Console());
} else if ( process.env.TRANSPORT === 'FILE' ) {
  logger.add(new winston.transports.File({
    filename: 'logs/recipio.log',
    maxsize: 5242880,
    maxFiles: 5,
  }));
}

module.exports = logger;