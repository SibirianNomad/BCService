import { Sequelize } from 'sequelize-typescript'
import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { UserModel } from './users'
import { WalletModel } from './wallets'

export type DatabaseOptions = Partial<{
  /**
   * create an in-memory test database
   */
  test: boolean

  /**
   * database server host
   */
  host: string

  /**
   * database server port
   */
  port: number

  /**
   * database server username
   */
  username: string

  /**
   * database server password
   */
  password: string

  /**
   * database name
   */
  database: string

  /**
   * database dialect
   */
  dialect: 'postgres' | 'sqlite' | 'mysql' /* currently supported */
}>

export const Database: Plugin<DatabaseOptions> = {
  name: 'database',
  version: pkg.version,
  register: async (server: Server, options: DatabaseOptions) => {
    let sequelize: Sequelize
    if (options.test) {
      sequelize = new Sequelize('sqlite::memory:', {
        models: [],
        logging: false,
        sync: {
          force: true,
          alter: true
        }
      })
      await sequelize.sync()
    } else {
      sequelize = new Sequelize({
        ...options,
        models: [UserModel, WalletModel]
      })
    }
    server.expose(sequelize)
  }
}
