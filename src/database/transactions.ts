import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  Model
} from 'sequelize-typescript'
import * as uuid from 'uuid'

export interface TransactionDto {
  id: string
  user_id:string,
  amount:string,
  status:boolean,
  event:string,
  transaction_hash:string,
  token_id:string,
  createdAt: Date
  updatedAt: Date
}

export type CreateTransaction = Omit<TransactionDto, 'id' | 'createdAt' | 'updatedAt'>

@Table({
  tableName: 'transactions',
  timestamps: true
})

export class TransactionModel extends Model<TransactionDto, CreateTransaction> implements TransactionDto {
  @Default(() => uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @Column(DataType.STRING)
  user_id: string

  @Column(DataType.STRING)
  amount: string

  @Column(DataType.BOOLEAN)
  status: boolean

  @Column(DataType.STRING)
  event: string

  @Column(DataType.STRING)
  transaction_hash: string

  @Column(DataType.STRING)
  token_id: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

export const createTransaction = async (transaction: CreateTransaction):Promise<TransactionDto> => {
  return await TransactionModel.create({
    user_id: transaction.user_id,
    amount: transaction.amount,
    status: transaction.status,
    event: transaction.event,
    transaction_hash: transaction.transaction_hash,
    token_id: transaction.token_id
  })
}
