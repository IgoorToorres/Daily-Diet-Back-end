import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { createAndAuthenticateSession } from '../meals/helpers/create-and-authenticate-section'

describe('Get only percentage stats of user', async () => {
  it('should be able to get only percentage stats of user', async () => {
    const { cookies } = await createAndAuthenticateSession()

    const percentage = await request(app.server)
      .get('/meals/stats/percentage')
      .set('Cookie', cookies)
      .expect(200)

    expect(percentage.body).toEqual({ percentage: 100 })
  })
})
