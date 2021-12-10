import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'
import { PayloadApiDto } from './../../schemes'
import {
  Web3Http,
  initTokenContract,
  initAccountWithPrivateKey,
  getTokenInfo,
  checkApiPayload,
  initContract
} from './../../../../services/bcService'
import * as config from '../../../../config'

export const getToken = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { token_id } = request.query
  const info = await getTokenInfo(token_id)

  if (info !== null) {
    return reply.response(info).code(200)
  }

  return reply.response('Token not found').code(404)
}

export const approve = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { token_id, amount, wallet_id, private_key } = request.payload as PayloadApiDto

  const result = await checkApiPayload(token_id, wallet_id)

  if (result) {
    return reply.response(result).code(422)
  }

  const acc = await initAccountWithPrivateKey(private_key)

  const contract_token = await initTokenContract(token_id, private_key)

  const gasPrice = await Web3Http.eth.getGasPrice()

  const amount_bc = Web3Http.utils.toHex(parseInt(amount))

  const gasEstimate = await contract_token.methods.approve(config.BcVariable.contract_address, amount_bc).estimateGas({ from: acc.address })

  contract_token.methods.approve(config.BcVariable.contract_address, amount_bc).send({
    from: acc.address,
    gasPrice: Web3Http.utils.toHex(gasPrice),
    gas: Web3Http.utils.toHex(gasEstimate)
  }, (err, data) => {
    console.log('err', err, 'data', data)
  })
  return reply.response('approve').code(200)
}

export const deposit = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { token_id, amount, wallet_id, private_key } = request.payload as PayloadApiDto

  const result = await checkApiPayload(token_id, wallet_id)

  if (!result) {
    return reply.response('incorrect wallet').code(422)
  }

  const acc = await initAccountWithPrivateKey(private_key)

  const contract = await initContract(private_key)

  const gasPrice = await Web3Http.eth.getGasPrice()

  const amount_bc = Web3Http.utils.toHex(parseInt(amount))

  const gasEstimate = await contract.methods.deposit(amount_bc, token_id).estimateGas({ from: acc.address })

  contract.methods.deposit(amount_bc, token_id).send({
    from: acc.address,
    gasPrice: Web3Http.utils.toHex(gasPrice),
    gas: Web3Http.utils.toHex(gasEstimate)
  }, (err, data) => {
    console.log('err', err, 'data', data)
  })

  return reply.response('deposit').code(200)
}

export const withdraw = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { token_id, amount, wallet_id, private_key } = request.payload as PayloadApiDto

  const result = await checkApiPayload(token_id, wallet_id)

  if (!result) {
    return reply.response('incorrect wallet').code(404)
  }

  const acc = await initAccountWithPrivateKey(private_key)

  const contract = await initContract(private_key)

  const gasPrice = await Web3Http.eth.getGasPrice()

  const amount_bc = Web3Http.utils.toHex(parseInt(amount))

  const gasEstimate = await contract.methods.deposit(amount_bc, token_id).estimateGas({ from: acc.address })

  contract.methods.withdraw(amount_bc, token_id).send({
    from: acc.address,
    gasPrice: Web3Http.utils.toHex(gasPrice),
    gas: Web3Http.utils.toHex(gasEstimate)
  }, (err, data) => {
    console.log('err', err, 'data', data)
  })

  return reply.response('withdraw').code(200)
}
