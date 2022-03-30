require('dotenv').config()
const app = require('./server/app')
require('./config/mongodb/connection')
const GrpcServerInitializer = require("./server/grpc/grpc_server")
let port = 3000

app.listen(port, () => {
    console.log(`Express web server listening the port : ${port}`)
    GrpcServerInitializer()
})