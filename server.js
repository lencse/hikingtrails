require('dotenv').config()

const Koa = require('koa')
const serveStatic = require('koa-static')

const app = new Koa()

app.use(serveStatic('.'))

app.use(async(ctx) => {
    for (const func of [
        'download',
        'map',
        'download-map',
        'planner'
    ]) {
        if (
            'GET' === ctx.request.method
            && ctx.request.url.match(new RegExp(`^\/${func}\/`))
        ) {
            const event = {
                path: ctx.request.url
            }
            const resp = await require(`./${func}`).handler(event)
            ctx.res.statusCode = resp.statusCode
            ctx.body = resp.body
            for (const key in resp.headers) {
                ctx.set(key, resp.headers[key])
            }
            return
        }
    }
})

app.listen(process.env.SERVER_PORT)
