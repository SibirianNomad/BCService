import * as Joi from 'joi'

interface Response<T> {
  ok: boolean
  result: T
}
export interface PayloadApiDto {
  token_id:string,
  amount: string,
  wallet_id:string,
  private_key:string
}

export const ResponseSchema = <T>(): Joi.ObjectSchema<Response<T>> =>
  Joi.object<Response<T>>({
    ok: Joi.boolean(),
    result: Joi.object<T>()
  })

export const PayloadApiSchema = (): Joi.ObjectSchema<PayloadApiDto> =>
  Joi.object<PayloadApiDto>({
    token_id: Joi.string().required().example('0x31Bc1ED55782B80c6941cb32b4b3BBE0F04A613a'),
    amount: Joi.string().required().example('1000000000'),
    wallet_id: Joi.string().required().example('0xd86Dc92ae4e81BC0102e85259275926C36BB320D'),
    private_key: Joi.string().required().example('b63a3ebaa0efe4ac96981f952fa96d57ce0611e067e2f0470658625084a0843d')
  }).label('payload')
