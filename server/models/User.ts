import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import Cart from './Cart'
import Rating from './Rating'

export type Role = 'ADMIN' | 'USER'

@Table
export default class User extends Model {
  @Column(DataTypes.STRING)
  email!: string

  @Column(DataTypes.STRING)
  firstName!: string

  @Column(DataTypes.STRING)
  lastName!: string

  @Column(DataTypes.STRING)
  password!: string

  @Column(DataTypes.STRING)
  role!: Role

  @HasOne(() => Cart)
  cart?: Cart

  @HasMany(() => Rating)
  ratings?: Rating[]
}
