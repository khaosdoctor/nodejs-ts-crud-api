import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import { SerializedTodoItem, SerializedTodoItemType, UnserializedTodoItem } from '../types'
import TodoNotFound from '../errors/TodoNotFound'

export const update = (collection: Collection<SerializedTodoItemType>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const updateFields = await UnserializedTodoItem.partial().parseAsync(req.body)
    const serializedUpdate = SerializedTodoItem.partial().parse({
      ...updateFields,
      updatedAt: new Date()
    })

    const updateResult = await collection.updateOne({ _id: id }, { $set: serializedUpdate })
    if (updateResult.matchedCount === 0) throw new TodoNotFound(id)

    const updated = await collection.findOne({ _id: id })
    res.status(200).json(SerializedTodoItem.parse(updated)).end()
  } catch (err) {
    next(err)
  }
}
