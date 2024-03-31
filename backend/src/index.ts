import { Hono } from 'hono'
import apiv1 from './api/v1'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/api/v1", apiv1)

export default app
