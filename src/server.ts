import Fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'

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

type ParamsType = {
  discussionId: string
}

fastify.get('/autocomplete/:discussionId', async (req: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {
  const discussionId = req.params.discussionId
  return { discussionId }
})

type QuerystringType = {
  querystring?: string
}

fastify.get('/autocomplete', async (req: FastifyRequest<{ Querystring: QuerystringType }>, reply: FastifyReply) => {
  const queryStr = req.query.querystring
  if (queryStr) {
    return { queryStr }
  } else {
    return { msg: "oops !! No querystring" }
  }
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
