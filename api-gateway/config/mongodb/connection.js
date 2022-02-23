const mongoose = require('mongoose');


mongoose.connect(process.env.CONNECTIONPATH,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('we have connected to the database'))
.catch((e)=>{
    console.log(e,'we got a problem')
});