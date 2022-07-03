import Express, { NextFunction, Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import { ZodError } from 'zod'
import TodoNotFound from './errors/TodoNotFound'
import { create, find, list, remove, update } from './routes'
import { SerializedTodoItemType } from './types'


const init = async () => {
  if (!process.env.MONGODB_CONNECTIONSTRING) throw new Error('Connection string required')
  const collection = (await MongoClient
    .connect(process.env.MONGODB_CONNECTIONSTRING))
    .db('todo-list')
    .collection<SerializedTodoItemType>('todos')

  const app = Express()

  app.use(Express.json())
  app.post('/todos', create(collection))
  app.get('/todos', list(collection))
  app.get('/todos/:id', find(collection))
  app.put('/todos/:id', update(collection))
  app.delete('/todos/:id', remove(collection))

  app.use((err: Error | TodoNotFound, req: Request, res: Response, next: NextFunction) => {
    console.log({
      err
    })
    if (err instanceof ZodError) {
      return res.status(422).json({
        error: err.message,
        details: err.issues
      }).end()
    }

    if (err instanceof TodoNotFound) {
      return res.status(404).json({
        error: err.message
      }).end()
    }
    next(err)
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

init().then(() => console.log('App Started')).catch(console.error)
