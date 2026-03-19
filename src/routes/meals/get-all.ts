import { FastifyInstance } from 'fastify'
import { checkUserIdExist } from '../../middlewares/check-user-id-exist'
import { db } from '../../database'
import { formatMeal } from '../../utils/formatMeal'

export async function getAllMeals(app: FastifyInstance) {
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
}
