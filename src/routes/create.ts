import { NextFunction, Request, Response } from 'express'
import { v4 } from 'uuid'
import { Collection } from 'mongodb'
import { SerializedTodoItem, SerializedTodoItemType, UnserializedTodoItem } from '../types'

export const create = (collection: Collection<SerializedTodoItemType>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdTodo = await UnserializedTodoItem.parseAsync(req.body)
    const serializedTodo = SerializedTodoItem.parse({
      ...createdTodo,
      _id: v4(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await collection.insertOne(serializedTodo)
    res.status(201).json(serializedTodo).end()
  } catch (err) {
    next(err)
  }
}
