import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from '../meals/helpers/create-and-authenticate-section'

describe('Edit Meal', async () => {
  it('should be able to change the meal', async () => {
    const { cookies } = await createAndAuthenticateSession()

    const meals = await request(app.server)
      .get(`/meals`)
      .set('Cookie', cookies)
      .expect(200)

    const id = await meals.body.meals[0].meals[0].id

    await request(app.server)
      .put(`/meals/${id}`)
      .set('Cookie', cookies)
      .send({
        name: 'arroz editado',
        description: '100 gramas deditado',
        time: '22:00',
        date: '13/10/2003',
        isOnDiet: false,
      })
      .expect(204)

    const edited = await request(app.server)
      .get(`/meals/${id}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(edited.body.meal).toEqual({
      id: expect.any(String),
      name: 'arroz editado',
      description: '100 gramas deditado',
      time: '22:00',
      date: '13/10/2003',
      isOnDiet: false,
    })
  })
})
