import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import BrandCategory from './BrandCategory'
import Category from './Category'
import Product from './Product'

@Table
export default class Brand extends Model {
  @Column(DataTypes.STRING)
  name!: string

  @HasMany(() => Product)
  products?: Product[]

  @BelongsToMany(() => Category, () => BrandCategory)
  categories?: Category[]
}
