import { FastifyInstance } from 'fastify'
import { checkUserIdExist } from '../../middlewares/check-user-id-exist'
import { db } from '../../database'

export async function getMealPercentage(app: FastifyInstance) {
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
