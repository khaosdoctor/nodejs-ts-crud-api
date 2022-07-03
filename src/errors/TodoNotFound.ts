export default class TodoNotFound extends Error {
  public statusCode: number = 404
  public statusMessage: string
  constructor (id: string) {
    super(`Todo item ${id} not found`)
    this.name = 'TodoNotFound'
    this.statusMessage = this.message
  }
}
