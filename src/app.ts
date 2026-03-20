import fastify from 'fastify'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export const app = fastify({
  ajv: {
    customOptions: {
      strict: false,
    },
  },
})

app.register(swagger, {
  openapi: {
    openapi: '3.0.3',
    info: {
      title: 'Daily Diet API',
      description: 'API para controle de refeições',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3333' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'userId',
        },
      },
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
})

app.register(cookie)
app.register(cors, {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})

app.register(mealsRoutes, {
  prefix: '/meals',
})
