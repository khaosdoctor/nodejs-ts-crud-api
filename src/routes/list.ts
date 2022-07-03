import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import { SerializedTodoItem, SerializedTodoItemType } from '../types'

export const list = (collection: Collection<SerializedTodoItemType>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await collection.find({}).toArray()

    const serializedTodos = todos.map(todo => SerializedTodoItem.parse(todo))
    res.status(201).json(serializedTodos).end()
  } catch (err) {
    next(err)
  }
}
