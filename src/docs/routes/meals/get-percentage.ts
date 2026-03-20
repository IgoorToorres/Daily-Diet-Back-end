export const getMealPercentageSchema = {
  tags: ['Meals'],
  summary: 'Retorna a porcentagem de refeições dentro da dieta',
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        percentage: { type: 'number' },
      },
      required: ['percentage'],
    },
  },
}
