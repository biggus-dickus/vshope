import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Brand from './Brand'
import Category from './Category'

@Table
export default class BrandCategory extends Model {
  @ForeignKey(() => Brand)
  @Column(DataTypes.INTEGER)
  brandId!: number

  @ForeignKey(() => Category)
  @Column(DataTypes.INTEGER)
  categoryId!: number
}
