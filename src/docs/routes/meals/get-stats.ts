export const getMealStatsSchema = {
  tags: ['Meals'],
  summary: 'Retorna estatísticas das refeições',
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        onDietPercentage: { type: 'number' },
        bestSequence: { type: 'number' },
        melasCount: { type: 'number' },
        onDiet: { type: 'number' },
        outDiet: { type: 'number' },
      },
      required: [
        'onDietPercentage',
        'bestSequence',
        'melasCount',
        'onDiet',
        'outDiet',
      ],
    },
  },
}
