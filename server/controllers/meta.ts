import type { Request, Response, NextFunction } from 'express'

export type CrudParams = Parameters<(req: Request, res: Response, next: NextFunction) => void>

export interface ICrud<T> {
  create: (...[req, res, next]: CrudParams) => Promise<Response<number> | void> | never

  deleteOne?(...[req, res, next]: CrudParams): Promise<Response<number> | null> | never

  deleteMany?(...[req, res, next]: CrudParams): Promise<Response<number[]>> | never

  getOne(...[req, res, next]: CrudParams): Promise<Response<T | null>>

  getMany(...[req, res, next]: CrudParams): Promise<Response<T[]>>

  update(...[req, res, next]: CrudParams): Promise<Response<T>> | never
}
