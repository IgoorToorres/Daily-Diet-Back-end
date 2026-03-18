import fastify from 'fastify'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cookie)
app.register(cors, {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})
app.register(mealsRoutes, {
  prefix: '/meals',
})
