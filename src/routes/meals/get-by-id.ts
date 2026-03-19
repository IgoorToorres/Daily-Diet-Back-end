import { FastifyInstance } from 'fastify'
import { checkUserIdExist } from '../../middlewares/check-user-id-exist'
import { db } from '../../database'
import { formatMeal } from '../../utils/formatMeal'
import { z } from 'zod'

export async function getMealById(app: FastifyInstance) {
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
}
