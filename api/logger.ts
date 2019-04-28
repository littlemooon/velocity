import { LoggingWinston } from '@google-cloud/logging-winston'
import * as expressWinston from 'express-winston'
import winston from 'winston'
import env from '../env'

const loggingWinston = new LoggingWinston()

const loggerConfig = {
  level: 'info',
  transports: env.dev
    ? [
        new winston.transports.Console({
          format: winston.format.combine(
            // winston.format.splat(),
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ]
    : [new winston.transports.Console(), loggingWinston],
}

const expressConfig = {
  ...loggerConfig,

  meta: false,
  expressFormat: true,
  colorize: true,

  ignoreRoute: req => ['_nuxt', '_loading'].includes(req.path.split('/')[1]),
}

const logger = winston.createLogger(loggerConfig)

export const expressLogger = expressWinston.logger(expressConfig)

export default logger
