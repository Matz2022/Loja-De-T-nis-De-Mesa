//criando o database
const database = new DatabaseMemory()
//importando o fastify
import { fastify } from 'fastify'
//importando o database memory
import {DatabaseMemory} from "./database-memory.js"
//criando nosso servirdor
const server = fastify()

//criando a raquete
server.post('/raquetes', (request, reply) => {
   //acessandoados do corpo desestruturado
   const {tipo, marca, quantidade} = request.body
   
    database.create({
    tipo: tipo,
    marca: marca,
    quantidade: quantidade,
   })
   console.log(database.list())
   return reply.status(201).send()
})
//jogue com raquetes profissionais
server.get('/raquetes', (request) => {
    //return "Jogue!!"
    const search = request.query.search
    console.log(search)
    //acessando o database
    const raquetes = database.list(search)
    //console.log(raquetes)
    //retornando raquetes
    return raquetes
})

server.put('/raquetes/:id', (request, reply) => {
    //return "Cuide da Raqute!!!"
    //passando o ID a raquete
    const raqueteId = request.params.raqueteId
    //passando restante dos atributos
    const  {tipo, marca, quantidade} = request.body
    const raquete = database.update(raqueteId, {
        tipo: tipo,
        marca: marca,
        quantidade: quantidade,
    })
    //sucessosem conteudo 
    return reply.status(204).send()
})
server.delete('/raquetes/:id', (request, reply) => {
    //return "Cuide da Raqute!!!"
    const raqueteId = request.params.raqueteId
    database.delete(raqueteId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})