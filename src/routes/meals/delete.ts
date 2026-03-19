import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../database'
import { checkUserIdExist } from '../../middlewares/check-user-id-exist'

export async function deleteMeal(app: FastifyInstance) {
  app.delete(
    '/:id',
    { preHandler: [checkUserIdExist] },
    async (request, reply) => {
      const getParamsRequestSchema = z.object({
        id: z.string().uuid(),
      })

      const userId = request.cookies.userId

      // validando id vindo da reuqisicao
      const { id } = getParamsRequestSchema.parse(request.params)

      const deleted = await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .delete()

      if (deleted === 0) {
        return reply.status(404).send({ error: 'Refeição nao encontrada' })
      }

      return reply.status(204).send()
    },
  )
}
