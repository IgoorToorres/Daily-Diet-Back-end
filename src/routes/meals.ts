import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { db } from '../database'
import { checkUserIdExist } from '../middlewares/check-user-id-exist'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkUserIdExist] }, async () => {
    return console.log('cheguei aqui')
  })

  app.post('/', async (request, reply) => {
    let userId = request.cookies.userId
    if (!userId) {
      userId = randomUUID()
      await db('users').insert({
        id: randomUUID(),
      })
      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7days
      })
    }

    return reply.status(201).send({
      message: 'usuario cadastrado com sucesso',
    })
  })
}
