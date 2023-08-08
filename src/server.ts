import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

const fastify: FastifyInstance = Fastify({
  logger: true,
})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
}

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' }
})

fastify.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })

    const address = fastify.server.address()
    const port = typeof address === 'string' ? address : address?.port
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
