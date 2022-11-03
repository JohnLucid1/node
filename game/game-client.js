const zmq = require('zeromq');
const requester = zmq.socket('req');
const min = Number(process.argv[2])
const max = Number(process.argv[3])
const msg = {
    range: min + "-" + max,
    answer: Math.floor(Math.random() * (max - min + 1)) + min,
    hint: ''
}

requester.connect('tcp://localhost:60123');

requester.on('message', data => {
    const response = JSON.parse(data);
    console.log(response, msg.answer)
    msg.hint = 'Напиши корректное число.'
    if (msg.answer > response.answer && response.answer >= min) {
        msg.hint = 'more'
    } else if (msg.answer < response.answer && response.answer <= max) {
        msg.hint = 'less'
    } else if (response.answer == msg.answer) {
        console.log('Угадал, сматываемся')
        requester.close()
    }
    requester.send(JSON.stringify({ hint: msg.hint }));
});

requester.send(JSON.stringify({ range: msg.range }));
