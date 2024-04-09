import { Hono } from 'hono'
import {cors} from 'hono/cors'
import apiv1 from './api/v1'

const app = new Hono()

app.use("/*",cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/api/v1", apiv1)

export default app
