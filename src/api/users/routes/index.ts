import { ServerRoute } from '@hapi/hapi'
// import {Web3Http, Web3Wss, Contract, ContractToken} from './../../../services/bcService'
// import {findUser, findUserWallet} from './../../../database/users'
// import {findWallet} from './../../../database/wallets'

export const test:ServerRoute = {
  method: 'GET',
  path: '/test',
  handler: () => {
    // const account1 = '0xd86Dc92ae4e81BC0102e85259275926C36BB320D'
    // const account2 = '0x4C4f56eBFfAD3054ac7B148eC9c0d7F3e1A44dc5'
    // const private_key1= process.env.WALLET_PRIVATE_KEY1

    return true
  }

}
