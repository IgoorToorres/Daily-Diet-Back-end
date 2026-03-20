import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { db } from '../../database'
import { parseDateTime } from '../../utils/parseDateTime'
import { createMealSchema } from '../../docs/routes/meals/create'

export async function createMealRoute(app: FastifyInstance) {
  app.post('/', { schema: createMealSchema }, async (request, reply) => {
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
