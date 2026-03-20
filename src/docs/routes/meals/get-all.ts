export const getAllMealsSchema = {
  tags: ['Meals'],
  summary: 'Lista refeições agrupadas por data',
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        meals: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string' },
              meals: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    time: { type: 'string' },
                    isOnDiet: { type: 'boolean' },
                  },
                  required: ['id', 'name', 'time', 'isOnDiet'],
                },
              },
            },
            required: ['date', 'meals'],
          },
        },
      },
      required: ['meals'],
    },
  },
}
