export const updateMealSchema = {
  tags: ['Meals'],
  summary: 'Atualiza uma refeição',
  security: [{ cookieAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    required: ['name', 'description', 'date', 'time', 'isOnDiet'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      date: { type: 'string' },
      time: { type: 'string' },
      isOnDiet: { type: 'boolean' },
    },
  },
  response: {
    204: { type: 'null' },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
      required: ['error'],
    },
  },
}
