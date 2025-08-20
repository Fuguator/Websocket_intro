const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => console.log('Server started on port 5000'));

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMesage(message)
                break;
            case 'connection':
                broadcastMesage(message)
                break;
        }
    })
})

const message = {
    event: 'message/connection',
    id: 123,
    date: '2001-01-01',
    username: 'Fugator',
    message: 'salam'
}

function broadcastMesage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}