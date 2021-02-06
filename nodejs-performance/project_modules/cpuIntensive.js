
function fiboLog(n) {
    console.log("num:",2)
    if (n < 2)
        return 1;
    else
        return fiboLog(n - 2) + fiboLog(n - 1);
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

const fibonacciLog = (num) => {
    return new Promise((resolve,reject) => {
        resolve(fiboLog(num))
    })
}

module.exports ={
    fibonacci, fibonacciLog
}
