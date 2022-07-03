import { z } from 'zod'

export const UnserializedTodoItem = z.object({
  title: z.string().min(1).trim(),
  description: z.string().max(280).optional().default(''),
  completed: z.boolean().default(false),
})

export const SerializedTodoItem = UnserializedTodoItem.extend({
  _id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type UnserializedTodoItemType = z.infer<typeof UnserializedTodoItem>
export type SerializedTodoItemType = z.infer<typeof SerializedTodoItem>
