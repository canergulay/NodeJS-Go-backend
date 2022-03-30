const protoLoader = require('@grpc/proto-loader');

const grpc = require('@grpc/grpc-js');

const protoPath = "../../../protobufs/authentication.proto"

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }

const packageDefinition = protoLoader.loadSync(protoPath, options);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);


var server = new grpc.Server();


server.addService(grpcObject.Validation.service,{
    ValidateToken:(ValidationRequest,callback)=>{
        console.log(ValidationRequest)
    }
} );


server.bindAsync('localhost:8081', grpc.ServerCredentials.createInsecure(),()=>{
    server.start()
});