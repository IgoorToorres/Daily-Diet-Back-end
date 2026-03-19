import { FastifyInstance } from 'fastify'
import { createMealRoute } from './create'
import { deleteMeal } from './delete'
import { getAllMeals } from './get-all'
import { getMealById } from './get-by-id'
import { getMealPercentage } from './get-percentage'
import { getMealStats } from './get-stats'
import { editMeal } from './put'

export async function mealsRoutes(app: FastifyInstance) {
  await createMealRoute(app)
  await deleteMeal(app)
  await getAllMeals(app)
  await getMealById(app)
  await getMealPercentage(app)
  await getMealStats(app)
  await editMeal(app)
}
