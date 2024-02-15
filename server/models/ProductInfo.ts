import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Product from './Product'

@Table
export default class ProductInfo extends Model {
  @Column(DataTypes.STRING)
  title!: string

  @Column(DataTypes.STRING)
  description!: string

  @ForeignKey(() => Product)
  @Column(DataTypes.INTEGER)
  productId!: number

  @BelongsTo(() => Product)
  product!: Product
}
