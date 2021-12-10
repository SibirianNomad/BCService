import { ServerRoute } from '@hapi/hapi'
import { Contract } from './../../../services/bcService'
import { responseFilter } from '../../responseFilter'
import { PayloadApiSchema } from './../schemes'
import * as Joi from 'joi'
import * as blockchain from './handlers/blockchain'

export const tokens:ServerRoute = {
  method: 'GET',
  path: '/tokens',
  handler: () => {
    const result = Contract.methods.getListTokens().call()
    return result
  },
  options: {
    id: 'tokens',
    notes: 'Get all available tokens for contract',
    tags: ['api', 'Tokens'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    }
  }

}

export const token:ServerRoute = {
  method: 'GET',
  path: '/token',
  handler: blockchain.getToken,
  options: {
    id: 'token',
    notes: 'Get info about tokens by token_id',
    tags: ['api', 'Tokens'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    },
    validate: {
      query: Joi.object({
        token_id: Joi.string().required().example('0x31Bc1ED55782B80c6941cb32b4b3BBE0F04A613a')
      })

    }
  }
}
export const deposit:ServerRoute = {
  method: 'POST',
  path: '/deposit',
  handler: blockchain.deposit,
  options: {
    id: 'deposit',
    notes: 'Send tokens to contract deposit',
    tags: ['api', 'Contract methods'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    },
    validate: {
      payload: PayloadApiSchema()
    }
  }
}

export const withdraw:ServerRoute = {
  method: 'POST',
  path: '/withdraw',
  handler: blockchain.withdraw,
  options: {
    id: 'withdraw',
    notes: 'Withdraw tokens from contract deposit',
    tags: ['api', 'Contract methods'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    },
    validate: {
      payload: PayloadApiSchema()
    }
  }
}

export const approve:ServerRoute = {
  method: 'POST',
  path: '/approve',
  handler: blockchain.approve,
  options: {
    id: 'approve',
    notes: 'Approve amount of tokens',
    tags: ['api', 'Contract methods'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    },
    validate: {
      payload: PayloadApiSchema()
    }
  }
}
