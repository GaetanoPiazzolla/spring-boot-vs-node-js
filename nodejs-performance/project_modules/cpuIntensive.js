const fs = require('fs')
const encrypt = require('./encrypt')

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

const encryption = () => {

    return new Promise((resolve,reject) => {
        let readStream = fs.createReadStream('./resources/nodejs-spring-logo.png', 'utf8');
        let data;
        readStream.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            for(let i=0;i<100;i++){
                encrypt.encrypt(data)
            }
            resolve()
        })
    })

}

module.exports ={
    fibonacci, encryption
}
