import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import CartProduct from './CartProduct'
import User from './User'

@Table
export default class Cart extends Model {
  @BelongsTo(() => User)
  user?: User

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  userId?: number

  @HasMany(() => CartProduct)
  products?: CartProduct[]
}
