import { LoggingWinston } from '@google-cloud/logging-winston'
import chalk from 'chalk'
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

export default function createLogger(filename: string) {
  const fname = chalk.blue(filename)
  const s = (o?: object) => (o ? JSON.stringify(o) : undefined)

  return {
    info(text: string, obj?: object) {
      logger.info(`${fname} - ${chalk.cyan(text)} `, s(obj))
    },
    warn(text: string, obj?: object) {
      logger.warn(`${fname} - ${chalk.cyan(text)} `, s(obj))
    },
    error(textOrError: string | Error, error?: Error) {
      const j = (a: string[]) => a.filter(Boolean).join(' ')
      const ename = (e?: string | Error) =>
        e instanceof Error ? chalk.cyan(`${j([e.name, e.message])}: `) : e
      const estack = (e?: Error) => (e && e.stack ? e.stack : undefined)

      if (textOrError instanceof Error) {
        logger.error(`${fname} - ${ename(textOrError)}`, estack(textOrError))
      } else {
        logger.error(`${fname} - ${ename(textOrError)}`, estack(error))
      }
    },
  }
}
