import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Brand from './Brand'
import CartProduct from './CartProduct'
import Category from './Category'
import ProductInfo from './ProductInfo'

@Table
export default class Product extends Model {
  @Column(DataTypes.STRING)
  name!: string

  @Column(DataTypes.FLOAT)
  price!: number

  @Column(DataTypes.INTEGER)
  rating = 0

  @Column(DataTypes.STRING)
  img?: string

  @HasMany(() => CartProduct)
  cartProducts?: CartProduct[]

  @HasMany(() => ProductInfo)
  details?: ProductInfo[]

  @BelongsTo(() => Category)
  category!: Category

  @ForeignKey(() => Category)
  @Column(DataTypes.INTEGER)
  categoryId!: number

  @BelongsTo(() => Brand)
  brand!: Brand

  @ForeignKey(() => Brand)
  @Column(DataTypes.INTEGER)
  brandId!: number
}
