import { Plugin, Server } from '@hapi/hapi'
import { test } from './routes'

export const Students: Plugin<object> = {
  name: 'students',
  version: '1',
  register: async (server: Server) => {
    server.route([test])
  }
}
