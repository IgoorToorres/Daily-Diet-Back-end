export const getMealByIdSchema = {
  tags: ['Meals'],
  summary: 'Busca uma refeição pelo id',
  security: [{ cookieAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        meal: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string' },
            time: { type: 'string' },
            isOnDiet: { type: 'boolean' },
          },
          required: ['id', 'name', 'description', 'date', 'time', 'isOnDiet'],
        },
      },
      required: ['meal'],
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
      required: ['error'],
    },
  },
}
