import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import TodoNotFound from '../errors/TodoNotFound'
import { SerializedTodoItem, SerializedTodoItemType } from '../types'

export const find = (collection: Collection<SerializedTodoItemType>) => async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const found = await collection.findOne({ _id: id })
    if (!found) throw new TodoNotFound(id)

    res.status(201).json(SerializedTodoItem.parse(found)).end()
  } catch (err) {
    next(err)
  }
}
