const locationRouter = require('./routers/location/location_router')
const userRouter = require('./routers/user/user_router')


const express = require('express')
const app = express()



app.use(express.json());
app.use(express.raw());
app.use(express.text());
//you should use those stuff before your routes.


app.use(userRouter)
app.use(locationRouter)


module.exports = app