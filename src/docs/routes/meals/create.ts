export const createMealSchema = {
  tags: ['Meals'],
  summary: 'Cria uma refeição',
  body: {
    type: 'object',
    required: ['name', 'description', 'date', 'time', 'isOnDiet'],
    properties: {
      name: { type: 'string', example: 'Café da manhã' },
      description: { type: 'string', example: 'Ovos e pão integral' },
      date: { type: 'string', example: '2026-03-20' },
      time: { type: 'string', example: '08:30' },
      isOnDiet: { type: 'boolean', example: true },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Refeição cadastrada com sucesso' },
      },
    },
  },
}
