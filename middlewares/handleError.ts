import { Request, Response, NextFunction } from 'express'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = err.message || 'Fallback error message'
  res.status(422).send({ error: errorMessage })
}
