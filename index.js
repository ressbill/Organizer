const app = require('./app')
const port = process.env.PORT || 5000
const server = app.listen(port)
server.on('listening',  () => {console.log(`Server started at port № : ${port}`)} )
server.on('error', onError)
function onError(error) {
    if (error.code === 'EADDRINUSE'){
        console.log(`PORT ${port} is already in use`)
        process.exit(1)
    } else {
        throw error
    }

}
