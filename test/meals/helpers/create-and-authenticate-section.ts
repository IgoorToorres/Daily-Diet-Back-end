import request from 'supertest'
import { app } from '../../../src/app'

export async function createAndAuthenticateSession() {
  const createMealResponse = await request(app.server).post('/meals').send({
    name: 'arroz e frango',
    description: '100 gramas de arroz e 200 gramas de frango no almoco',
    date: '12/10/2003',
    time: '21:00',
    isOnDiet: true,
  })

  const cookies = createMealResponse.get('Set-Cookie')

  if (!cookies) {
    throw new Error('Expected set-cookie to be present')
  }

  return { cookies }
}
