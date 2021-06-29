import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'

interface IQueryString {
    name: string;
}

interface IParams {
    name: string;
}

interface CustomRouteGenericParam {
    Params: IParams
}

interface CustomRouteGenericQuery {
    Querystring: IQueryString
}

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {


    instance.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        res.status(200).send({
            hello: 'World'
        })
    })

    instance.register(async (instance: FastifyInstance, opts: FastifyServerOptions, done) => {

        instance.get('/', async (req: FastifyRequest<CustomRouteGenericQuery>, res: FastifyReply) => {
            const { name = '' } = req.query
            res.status(200).send(`Hello ${name}`)
        })

        instance.get('/:name', async (req: FastifyRequest<CustomRouteGenericParam>, res: FastifyReply) => {
            const { name = '' } = req.params
            res.status(200).send(`Hello ${name}`)
        })
        done()
    }, {
        prefix: '/hello'
    })

    done()
}