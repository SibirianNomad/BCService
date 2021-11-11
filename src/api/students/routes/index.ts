import { ServerRoute } from '@hapi/hapi'

export const test:ServerRoute = {
  method: 'GET',
  path: '/test',
  handler: () => {
    return true
  }

}
