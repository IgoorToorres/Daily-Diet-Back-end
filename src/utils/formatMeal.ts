import { Meal } from '../@types/meal'
import { formatDateTime } from './formatDateTime'

export function formatMeal(meal: Meal) {
  const { date, time } = formatDateTime(meal.consumed_at)

  return {
    id: meal.id,
    name: meal.name,
    description: meal.description,
    time,
    date,
    isOnDiet: Boolean(meal.is_on_diet),
  }
}
