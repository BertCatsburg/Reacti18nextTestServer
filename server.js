const express = require('express')
const app = express()
const port = 3014

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/getlanguage', (req, res, next) => {
    const lang = req.query.lang


    res.send('You requests language ' + lang);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})