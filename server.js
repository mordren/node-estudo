/*
import { createServer } from 'node:http'

const server = createServer((request, response) => {
    console.log('oi')
    return response.write('oi')
})

server.listen(3333)

// localhost:3333
*/

import { fastify  } from "fastify"
import { request } from "http"
//import { DataBaseMemory  } from "./database-memory.js"
import { DataBasePostgres  } from "./database-postgres.js"

const server = fastify()

//const database = new DataBaseMemory()
const database = new DataBasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    // quando tu quer criar o mesmo nome, tu usa apenas o primeiro nome.
    //title é title do MAP.
    await database.create({
        title,
        description,
        duration
    })

    console.log(database.list())
    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    console.log(videoId)
    const { title, description, duration } = request.body
    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
    
})

server.get('/videos/:id', (request, reply) => {
    return 'hello get'
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333
})