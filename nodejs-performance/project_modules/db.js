const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})

const getBooks = (request, response) => {
    console.log(request.id, 'get books called')
    pool.query('SELECT * FROM books ORDER BY book_id ASC', (error, results) => {
        if (error) {
            console.log('error')
            response.status(500).json(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}

const getBookByISBN = (request, response) => {
    console.log(request.id, 'getBookByISBN called')

    pool.query('SELECT * FROM books WHERE isbn = $1', [request.params.isbn], (error, results) => {
        if (error) {
            console.log('error')
            response.status(500).json(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}

const createBook = (request, response) => {
    console.log(request.id, 'before createbook')

    const { title, author, isbn, year } = request.body

    pool.query('INSERT INTO books (book_id, title, author, isbn, year) VALUES (nextval(\'books_book_id_seq\'), $1, $2, $3, $4)',
            [title, author, isbn, year], (error, results) => {
        if (error) {
            console.log('error')
            response.status(500).json(error)
        }else{
            console.log(request.id,`Book added`)
            response.status(201).send(`Book added`)
        }
    })

}

module.exports = {
    getBooks,
    getBookByISBN,
    createBook
}