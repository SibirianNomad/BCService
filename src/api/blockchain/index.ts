import { Plugin, Server } from '@hapi/hapi'
import { tokens, token, deposit, approve, withdraw } from './routes'

export const Users: Plugin<object> = {
  name: 'users',
  version: '1',
  register: async (server: Server) => {
    server.route([tokens, token, deposit, approve, withdraw])
  }
}
