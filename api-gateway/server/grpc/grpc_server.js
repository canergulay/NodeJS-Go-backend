const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const ValidateToken = require('./services/ValidateToken')

const protoPath = "../protobufs/authentication.proto";
const port = "8081"

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

var server = new grpc.Server();

server.addService(grpcObject.Validation.service, {
  ValidateToken: ValidateToken,
});


module.exports = () => {
  server.bindAsync(
    `localhost:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log(`gRPC server has been started and listening the port : ${port}!`)
      server.start();
    }
  );
};
