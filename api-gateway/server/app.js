const locationRouter = require('./routers/location/location_router')
const userRouter = require('./routers/user/user_router')
const advertRouter = require('./routers/advert/advert_router')
const uplodRouter = require('./routers/image_upload/image_upload_router')

const express = require('express')
const app = express()

app.use('/assets', express.static("assets"));
app.use('/avatars', express.static("assets/avatars"));

app.use(express.json());
app.use(express.raw());
app.use(express.text());

//you should use those stuff before your routes.


app.use(userRouter)
app.use(locationRouter)
app.use(advertRouter)
app.use(uplodRouter)


module.exports = app