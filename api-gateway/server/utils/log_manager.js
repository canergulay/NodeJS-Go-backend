const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });


  const Logger = (errorObject,...info) => {
    logger.log({error:errorObject,extraInfo:info})
  }



  module.exports = {Logger}