import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  BelongsTo
} from 'sequelize-typescript'
import * as uuid from 'uuid'
import { UserModel } from './users'

export interface TransactionDto {
  id: string
  currency_id:string,
  user_id:string,
  createdAt: Date
  updatedAt: Date
}

@Table({
  tableName: 'transactions',
  timestamps: true
})
export class TransactionModel {
  @Default(uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @Column(DataType.STRING)
  currency_id: string

  @Column(DataType.STRING)
  user_id: string

  @BelongsTo(() => UserModel, 'user_id') user: UserModel;
}
