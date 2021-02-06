const express = require('express')
const app = express()

app.get('/fibonacci/:num', (req,res) => {
    fibonacci(req.params.num).then( (n) => {
        res.json({num: n})
    })
})

app.get('/dostuff/:num', (req,res) => {
        res.json({num: doStuff(req.params.num)})
    })

function doStuff(n){
    for(let i=0; i<n*10000; i++) { i=i}
}

function fibo(n) {
    if (n < 2)
        return 1;
    else
        return fibo(n - 2) + fibo(n - 1);
}

const fibonacci = (num) => {
    return new Promise((resolve,reject) => {
        resolve(fibo(num))
    })
}

app.listen(8080, () => {
    console.log(`App running on port ${8080}.`)
})
