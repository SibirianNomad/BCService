import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  Scopes
} from 'sequelize-typescript'
import * as uuid from 'uuid'
import { UserModel } from './users'

export interface WalletDto {
  id: string
  token_id:string,
  user_id:string,
  sum:Float32Array,
  created_at: Date,
  updated_at: Date
}

export type CreateWallet = Omit<WalletDto, 'id' | 'sum'| 'created_at' | 'updated_at'>

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    }
  }
}))

@Table({
  tableName: 'wallets',
  timestamps: true
})
export class WalletModel extends Model<WalletDto, CreateWallet> implements WalletDto {
  @Default(() => uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @CreatedAt
  created_at: Date

  @UpdatedAt
  updated_at: Date

  @ForeignKey(() => UserModel)
  @Column(DataType.STRING)
  user_id: string

  @Column(DataType.STRING)
  token_id: string

  @Column(DataType.FLOAT)
  sum: Float32Array

  @BelongsTo(() => UserModel, 'user_id') user: UserModel;
}

export const findWallet = async (wallet: CreateWallet): Promise<Object> => {
  return await WalletModel.findOrCreate({
    where: {
      user_id: wallet.user_id,
      token_id: wallet.token_id
    }
  })
}
