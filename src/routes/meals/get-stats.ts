import { FastifyInstance } from 'fastify'
import { checkUserIdExist } from '../../middlewares/check-user-id-exist'
import { db } from '../../database'
import { getMealStatsSchema } from '../../docs/routes/meals/get-stats'

export async function getMealStats(app: FastifyInstance) {
  app.get(
    '/stats',
    { preHandler: [checkUserIdExist], schema: getMealStatsSchema },
    async (request) => {
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
    },
  )
}
