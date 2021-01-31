const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const { body, validationResult } = require('express-validator');

const logging = require('./logging.js')
logging.configure(app)

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/books', db.getBooks)

app.get('/books/:isbn', db.getBookByISBN)

app.post('/books',

    body('title').isLength({min: 5}),
    body('author').isLength({min: 5}),
    body('isbn').isLength({min: 10}),
    body('year').isNumeric(),

    ((req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        db.createBook(req,res)

    }))


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})