import * as Joi from '@hapi/joi'

export const JoiTimestamp = Joi.object({
  _seconds: Joi.number(),
  _nanoseconds: Joi.number(),
})
