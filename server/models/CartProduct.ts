import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Cart from './Cart'
import Product from './Product'

@Table
export default class CartProduct extends Model {
  @BelongsTo(() => Cart)
  cart!: Cart

  @ForeignKey(() => Cart)
  @Column(DataTypes.INTEGER)
  cartId!: number

  @BelongsTo(() => Product)
  product!: Product

  @ForeignKey(() => Product)
  @Column(DataTypes.INTEGER)
  productId!: number
}
