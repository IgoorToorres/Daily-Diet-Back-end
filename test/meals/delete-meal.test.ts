import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from '../meals/helpers/create-and-authenticate-section'

describe('Delete Meal', async () => {
  it('should be able to delete a meal', async () => {
    const { cookies } = await createAndAuthenticateSession()

    const meals = await request(app.server)
      .get(`/meals`)
      .set('Cookie', cookies)
      .expect(200)

    const id = await meals.body.meals[0].meals[0].id

    await request(app.server)
      .delete(`/meals/${id}`)
      .set('Cookie', cookies)
      .send({
        name: 'arroz editado',
        description: '100 gramas deditado',
        time: '22:00',
        date: '13/10/2003',
        isOnDiet: false,
      })
      .expect(204)

    const noMeals = await request(app.server)
      .get(`/meals`)
      .set('Cookie', cookies)
      .expect(200)

    expect(noMeals.body.meals).toEqual([])
  })
})
