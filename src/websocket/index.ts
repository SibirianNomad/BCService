import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { Contract, Web3Http } from './../services/bcService'
import { findUser, findUserWallet } from './../database/users'
import { findWallet } from './../database/wallets'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WebsocketOptions = Record<string, any>

export const Websocket: Plugin<WebsocketOptions> = {
  name: 'websocket',
  version: pkg.version,
  register: async (server: Server, options: WebsocketOptions) => {
    // subscribe on contract event Deposit
    Contract.events.Deposit((error, event) => {
      if (!error) {
        findUser(event.returnValues.addressOwner).then((data) => {
          const id = data[0].dataValues.id
          findWallet({
            user_id: id,
            token_id: event.returnValues.addressToken
          }).then((data) => {
            data[0].increment('sum', { by: Web3Http.utils.fromWei(event.returnValues.amount) })
          })
        })
      } else {
        console.error(error)
      }
    })
    // subscribe on contract event Withdraw
    Contract.events.Withdraw((error, event) => {
      if (!error) {
        findUserWallet(event.returnValues.account, event.returnValues.token).then((data) => {
          data.wallet.decrement('sum', { by: Web3Http.utils.fromWei(event.returnValues.amount) })
        })
      } else {
        console.error(error)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.method('send', (data: any, path: string | '*') => {
      if (path === '*') {
        server.broadcast(data)
        return
      }

      server.publish(path, data)
    })
  }
}
