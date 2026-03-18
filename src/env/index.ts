import { z } from 'zod'
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['test', 'dev', 'hom', 'prod']).default('dev'),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    'variaveis de ambiente configuradas erradas',
    _env.error.format(),
  )

  throw new Error('Variaveis de ambiente invalidas')
}

export const env = _env.data
