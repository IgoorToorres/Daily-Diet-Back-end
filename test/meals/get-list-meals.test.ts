import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from './helpers/create-and-authenticate-section'

describe('List meals', async () => {
  it('should be able to list all meals', async () => {
    const { cookies } = await createAndAuthenticateSession()
    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'pizza',
      description: 'pizza no jantar',
      date: '11/10/2003',
      time: '22:00',
      isOnDiet: false,
    })

    const response = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body.meals).toEqual([
      {
        date: '12/10/2003',
        meals: [
          {
            id: expect.any(String),
            name: 'arroz e frango',
            time: '21:00',
            isOnDiet: true,
          },
        ],
      },
      {
        date: '11/10/2003',
        meals: [
          {
            id: expect.any(String),
            name: 'pizza',
            time: '22:00',
            isOnDiet: false,
          },
        ],
      },
    ])
  })
})
