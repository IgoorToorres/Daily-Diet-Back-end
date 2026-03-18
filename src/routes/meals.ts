import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { db } from '../database'
import { checkUserIdExist } from '../middlewares/check-user-id-exist'
import { z } from 'zod'
import { parseDateTime } from '../utils/parseDateTime'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkUserIdExist] }, async () => {
    return console.log('cheguei aqui')
  })

  app.put(
    '/:id',
    { preHandler: [checkUserIdExist] },
    async (request, reply) => {
      // criando schema do zod para validar o id pelos params da requisicao
      const getParamsRequestSchema = z.object({
        id: z.string().uuid(),
      })

      // validando id vindo da reuqisicao
      const { id } = getParamsRequestSchema.parse(request.params)

      // cirando schema do zod para validacao dos dados do body
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.string(),
        time: z.string(),
        isOnDiet: z.boolean(),
      })

      // resgatando valores do body se passarem pela validacao
      const { name, description, date, time, isOnDiet } =
        createMealBodySchema.parse(request.body)

      // eslint-disable-next-line camelcase
      const consumed_at = parseDateTime(date, time)

      const userId = request.cookies.userId

      const updated = await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .update({
          name,
          description,
          // eslint-disable-next-line camelcase
          consumed_at,
          is_on_diet: isOnDiet,
        })

      if (updated === 0) {
        return reply.status(404).send({
          error: 'Refeição não encontrada',
        })
      }

      reply.status(204).send()
    },
  )

  app.post('/', async (request, reply) => {
    // cirando schema do zod para validacao dos dados do body
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      isOnDiet: z.boolean(),
    })

    // resgatando valores do body se passarem pela validacao
    const { name, description, date, time, isOnDiet } =
      createMealBodySchema.parse(request.body)

    // verificando se existe o cookie, caso não, cria um novo
    let userId = request.cookies.userId
    if (!userId) {
      userId = randomUUID()
      await db('users').insert({
        id: userId,
      })
      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7days
      })
    }

    // convertendo date e time para um campo só no banco
    // eslint-disable-next-line camelcase
    const consumed_at = parseDateTime(date, time)

    // gravando dados do body no banco
    await db('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      // eslint-disable-next-line camelcase
      consumed_at,
      is_on_diet: isOnDiet,
    })

    // resposta
    return reply.status(201).send({
      message: 'Refeição cadastrada com sucesso',
    })
  })
}
