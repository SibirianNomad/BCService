import {} from 'database/'
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Scopes,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasOne
} from 'sequelize-typescript'
import * as uuid from 'uuid'

import { WalletModel } from './wallets'

export interface UserDto {
  id: string
  wallet_id:string,
  created_at: Date
  updated_at: Date
}

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    }
  }
}))

@Table({
  tableName: 'users',
  timestamps: true
})
export class UserModel extends Model<UserDto> implements UserDto {
  @Default(uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @ForeignKey(() => WalletModel)
  @Column(DataType.STRING)
  wallet_id: string

  @CreatedAt
  created_at: Date

  @UpdatedAt
  updated_at: Date

  @HasOne(() => WalletModel, 'user_id')
  wallet: WalletModel[];
}

export const findUser = async (wallet_id: string): Promise<Object> => {
  return await UserModel.findOrCreate({
    where: {
      wallet_id: wallet_id
    }
  })
}

export const findUserWallet = async (wallet_id: string, token_id:string): Promise<Object> => {
  return await UserModel.findOne({
    where: {
      wallet_id: wallet_id
    },
    include: {
      model: WalletModel,
      where: {
        token_id: token_id
      }
    }
  })
}
