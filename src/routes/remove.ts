import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import { SerializedTodoItemType } from '../types'

export const remove = (collection: Collection<SerializedTodoItemType>) => async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await collection.deleteOne({ _id: id })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
