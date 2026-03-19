// import { afterAll, beforeAll, it, describe, beforeEach, expect } from 'vitest'
// import { execSync } from 'node:child_process'
// import { app } from '../../src/app'
// import request from 'supertest'

// describe('Meals routes', () => {
//   beforeAll(async () => {
//     await app.ready()
//   })

//   afterAll(async () => {
//     await app.close()
//   })

//   beforeEach(async () => {
//     execSync('npm run knex migrate:rollback --all')
//     execSync('npm run knex migrate:latest')
//   })

//   it(' should be able to create a meal', async () => {
//     await request(app.server)
//       .post('/meals')
//       .send({
//         name: 'arroz e frango',
//         description: '100 gramas de arroz e 200 gramas de frango no almoco',
//         date: '12/10/2003',
//         time: '21:00',
//         isOnDiet: true,
//       })
//       .expect(201)
//   })

//   it('should be able to list all meals', async () => {
//     const createMealResponse = await request(app.server).post('/meals').send({
//       name: 'arroz e frango',
//       description: '100 gramas de arroz e 200 gramas de frango no almoco',
//       date: '12/10/2003',
//       time: '21:00',
//       isOnDiet: true,
//     })

//     const cookies = createMealResponse.get('Set-Cookie')

//     if (!cookies) {
//       throw new Error('Expected set-cookie to be present')
//     }

//     await request(app.server).post('/meals').set('Cookie', cookies).send({
//       name: 'pizza',
//       description: 'pizza no jantar em um aniversario',
//       date: '11/10/2003',
//       time: '22:00',
//       isOnDiet: false,
//     })

//     const listMealsResponse = await request(app.server)
//       .get('/meals')
//       .set('Cookie', cookies)
//       .expect(200)

//     expect(listMealsResponse.body.meals).toEqual([
//       {
//         date: '12/10/2003',
//         meals: [
//           {
//             id: expect.any(String),
//             name: 'arroz e frango',
//             time: '21:00',
//             isOnDiet: true,
//           },
//         ],
//       },
//       {
//         date: '11/10/2003',
//         meals: [
//           {
//             id: expect.any(String),
//             name: 'pizza',
//             time: '22:00',
//             isOnDiet: false,
//           },
//         ],
//       },
//     ])
//   })

//   it('should be able to get a specific meal', async () => {
//     const createMealResponse = await request(app.server).post('/meals').send({
//       name: 'arroz e frango',
//       description: '100 gramas de arroz e 200 gramas de frango no almoco',
//       date: '12/10/2003',
//       time: '21:00',
//       isOnDiet: true,
//     })

//     const cookies = createMealResponse.get('Set-Cookie')

//     if (!cookies) {
//       throw new Error('Expected set-cookie to be present')
//     }

//     const listMealsResponse = await request(app.server)
//       .get('/meals')
//       .set('Cookie', cookies)
//       .expect(200)

//     const id = listMealsResponse.body.meals[0].meals[0].id

//     const specificMeal = await request(app.server)
//       .get(`/meals/${id}`)
//       .set('Cookie', cookies)
//       .expect(200)

//     expect(specificMeal.body.meal).toEqual({
//       id: expect.any(String),
//       name: 'arroz e frango',
//       description: '100 gramas de arroz e 200 gramas de frango no almoco',
//       date: '12/10/2003',
//       time: '21:00',
//       isOnDiet: true,
//     })
//   })
// })
