import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Brand from './Brand'
import BrandCategory from './BrandCategory'
import Product from './Product'

@Table
export default class Category extends Model {
  @Column(DataTypes.STRING)
  name!: string

  @HasMany(() => Product)
  products?: Product[]

  @BelongsToMany(() => Brand, () => BrandCategory)
  brands?: Brand[]
}
