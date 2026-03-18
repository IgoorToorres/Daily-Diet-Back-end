import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { db } from '../database'
import { checkUserIdExist } from '../middlewares/check-user-id-exist'
import { z } from 'zod'
import { parseDateTime } from '../utils/parseDateTime'
import { formatMeal } from '../utils/formatMeal'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkUserIdExist] }, async (request) => {
    const userId = request.cookies.userId

    const meals = await db('meals')
      .where('user_id', userId)
      .orderBy('consumed_at', 'desc')
      .select()

    const formattedMeals = meals.map(formatMeal)

    const grouped = formattedMeals.reduce((acc, meal) => {
      const existingDate = acc.find((item) => item.date === meal.date)

      if (existingDate) {
        existingDate.meals.push({
          id: meal.id,
          name: meal.name,
          time: meal.time,
          isOnDiet: meal.isOnDiet,
        })
      } else {
        acc.push({
          date: meal.date,
          meals: [
            {
              id: meal.id,
              name: meal.name,
              time: meal.time,
              isOnDiet: meal.isOnDiet,
            },
          ],
        })
      }

      return acc
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, [] as any[])

    return { meals: grouped }
  })

  app.get(
    '/:id',
    { preHandler: [checkUserIdExist] },
    async (request, reply) => {
      const userId = request.cookies.userId

      const getParamsRequestSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getParamsRequestSchema.parse(request.params)

      const meal = await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .first()

      if (!meal) {
        return reply.status(404).send({ error: 'Refeição não encontrada' })
      }

      const mealFormated = formatMeal(meal)
      return { meal: mealFormated }
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkUserIdExist] },
    async (request, reply) => {
      const getParamsRequestSchema = z.object({
        id: z.string().uuid(),
      })

      const userId = request.cookies.userId

      // validando id vindo da reuqisicao
      const { id } = getParamsRequestSchema.parse(request.params)

      const deleted = await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .delete()

      if (deleted === 0) {
        return reply.status(404).send({ error: 'Refeição nao encontrada' })
      }

      return reply.status(204).send()
    },
  )

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

  app.get('/stats', { preHandler: [checkUserIdExist] }, async (request) => {
    // porcentagem de comidas dentro da dieta
    // melhor sequencia de comidas dentro da dieta
    // total de refeicoes
    // refeicoes dentro da dieta X
    // refeicoes fora da dieta X

    const userId = request.cookies.userId

    const meals = await db('meals')
      .where({
        user_id: userId,
      })
      .orderBy('consumed_at', 'asc')
      .select('is_on_diet')

    let bestSequence = 0
    let currentSequence = 0

    for (const meal of meals) {
      if (meal.is_on_diet) {
        currentSequence += 1
        if (currentSequence > bestSequence) {
          bestSequence = currentSequence
        }
      } else {
        currentSequence = 0
      }
    }

    const onDietResult = await db('meals')
      .where({
        user_id: userId,
        is_on_diet: true,
      })
      .count({ count: '*' })
      .first()

    const outDietResult = await db('meals')
      .where({
        user_id: userId,
        is_on_diet: false,
      })
      .count({ count: '*' })
      .first()

    const onDiet = Number(onDietResult?.count ?? 0)
    const outDiet = Number(outDietResult?.count ?? 0)
    const melasCount = onDiet + outDiet

    const onDietPercentage = Number(((onDiet / melasCount) * 100).toFixed(2))

    return { onDietPercentage, bestSequence, melasCount, onDiet, outDiet }
  })

  app.get(
    '/stats/percentage',
    { preHandler: [checkUserIdExist] },
    async (request) => {
      const userId = request.cookies.userId

      const onDietResult = await db('meals')
        .where({
          user_id: userId,
          is_on_diet: true,
        })
        .count({ count: '*' })
        .first()

      const outDietResult = await db('meals')
        .where({
          user_id: userId,
          is_on_diet: false,
        })
        .count({ count: '*' })
        .first()

      const onDiet = Number(onDietResult?.count ?? 0)
      const outDiet = Number(outDietResult?.count ?? 0)
      const melasCount = onDiet + outDiet
      const onDietPercentage = Number(((onDiet / melasCount) * 100).toFixed(2))

      return { percentage: onDietPercentage }
    },
  )
}
