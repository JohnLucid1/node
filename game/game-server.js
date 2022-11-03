const zmq = require('zeromq');
const responder = zmq.socket('rep');
const readline = require("readline")

responder.bind('tcp://127.0.0.1:60123', err => {
    if (err) throw err;
    console.log('ready to guess');
});

responder.on('message', data => {
    const request = JSON.parse(data);
    console.log(request)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('Какая ваша догадка? \n', (answer) => {
        const msg = {
            answer: Number(answer)
        }
        responder.send(JSON.stringify(msg));
        rl.close();
    })
})