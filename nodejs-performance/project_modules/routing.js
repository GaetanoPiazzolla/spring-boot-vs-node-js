const db = require('./db')
const { body, validationResult } = require('express-validator');
const jwt = require('./jwt');
const cpuIntensive = require('./cpuIntensive')

const configure = (app) => {

    app.get('/', jwt.checkToken, (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API' })
    })

    app.post('/login',
        body('username').isLength({min: 1}),
        body('password').isLength({min: 1}),

        (req,res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            jwt.login(req,res)
        });

    app.get('/books', jwt.checkToken, db.getBooks)

    app.get('/books/:isbn', jwt.checkToken, db.getBookByISBN)

    app.post('/books', jwt.checkToken,

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
            console.log(req.id,'outside create book')

        }))

    app.get('/cpu-intensive/:num', jwt.checkToken, (req,res) => {
        cpuIntensive.powTanAtan(req.params.num).then((n) => {
            res.json({num: n})
        })
    })

}

module.exports = {
    configure
}