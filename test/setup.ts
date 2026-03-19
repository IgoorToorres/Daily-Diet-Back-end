import { afterAll, beforeAll, beforeEach } from 'vitest'
import { app } from '../src/app'
import { db } from '../src/database'

beforeAll(async () => {
  await app.ready()
  await db.migrate.latest()
})

afterAll(async () => {
  await app.close()
  await db.destroy()
})

beforeEach(async () => {
  await db('meals').delete()
})
