const app = require('./server/app')

let port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})