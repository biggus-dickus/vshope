import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import User from './User'

@Table
export default class Rating extends Model {
  @Column(DataTypes.INTEGER)
  value!: number

  @BelongsTo(() => User)
  user?: User

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  userId?: number
}
