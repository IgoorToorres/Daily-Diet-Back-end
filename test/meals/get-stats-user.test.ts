import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from '../meals/helpers/create-and-authenticate-section'

describe('Get stats of user', async () => {
  it('should be able to get all stats of user', async () => {
    const { cookies } = await createAndAuthenticateSession()

    const stats = await request(app.server)
      .get('/meals/stats')
      .set('Cookie', cookies)
      .expect(200)

    expect(stats.body).toEqual({
      onDietPercentage: 100,
      bestSequence: 1,
      melasCount: 1,
      onDiet: 1,
      outDiet: 0,
    })
  })
})
