import { Plugin, Server } from '@hapi/hapi'
import { test } from './routes'

export const Users: Plugin<object> = {
  name: 'users',
  version: '1',
  register: async (server: Server) => {
    server.route([test])
  }
}
