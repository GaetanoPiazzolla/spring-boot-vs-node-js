const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'db-service',
    database: 'postgres',
    password: 'postgres',
    port: 5432
})

const getBooks = (request, response) => {
    console.log(request.id, 'get books called')
    pool.query('SELECT * FROM library.books ORDER BY book_id ASC', (error, results) => {
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

    pool.query('SELECT * FROM library.books WHERE isbn = $1', [request.params.isbn], (error, results) => {
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

    pool.query('INSERT INTO library.books (book_id, title, author, isbn, year) VALUES (nextval(\'library.books_book_id_seq\'), $1, $2, $3, $4)',
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