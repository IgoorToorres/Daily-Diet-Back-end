export const deleteMealSchema = {
  tags: ['Meals'],
  summary: 'Remove uma refeição',
  security: [{ cookieAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    204: {
      type: 'null',
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
