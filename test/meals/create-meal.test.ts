import { describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('Create meal', async () => {
  it('should be able to create a meal', async () => {
    await request(app.server)
      .post('/meals')
      .send({
        name: 'arroz e frango',
        description: '100g arroz + 200g frango',
        date: '12/10/2003',
        time: '21:00',
        isOnDiet: true,
      })
      .expect(201)
  })
})
