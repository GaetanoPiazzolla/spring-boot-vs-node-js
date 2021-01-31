const db = require('./db')
const { body, validationResult } = require('express-validator');

const configure = (app) => {

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

}

module.exports = {
    configure
}