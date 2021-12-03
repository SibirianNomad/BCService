import * as Joi from 'joi'

interface Response<T> {
  ok: boolean
  result: T
}

export const ResponseSchema = <T>(): Joi.ObjectSchema<Response<T>> =>
  Joi.object<Response<T>>({
    ok: Joi.boolean(),
    result: Joi.object<T>()
  })
