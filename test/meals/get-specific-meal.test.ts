import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from '../meals/helpers/create-and-authenticate-section'

describe('Get specific meal', async () => {
  it('should be able to get a specific meal', async () => {
    const { cookies } = await createAndAuthenticateSession()

    const meals = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const id = await meals.body.meals[0].meals[0].id

    const response = await request(app.server)
      .get(`/meals/${id}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body.meal).toEqual({
      id: expect.any(String),
      name: 'arroz e frango',
      description: '100 gramas de arroz e 200 gramas de frango no almoco',
      time: '21:00',
      date: '12/10/2003',
      isOnDiet: true,
    })
  })
})
