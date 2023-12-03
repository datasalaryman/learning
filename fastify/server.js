import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'

const server = Fastify()

await server.register(FastifyVite, {
  root: import.meta.url,
  dev: process.argv.includes('--dev'),
  spa: true
})

server.get('/', (req, reply) => {
  return reply.html()
})

await server.vite.ready()
await server.listen({ port: 4000 })