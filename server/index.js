const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var rp = require('request-promise');


//lo que carga
app.use(express.static('client'));

app.get('/hi', function(req, res){
    res.status(200).send('Hi');
});

async function getMenu() {
    var menuApi = await rp('https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
        .then(function (htmlString) {
            return htmlString;
        });
    return menuApi;
}
var messages;
async function initBot (){
    messages = [{
        id:1,
        nickname: 'CUPCAKE!: ',
        text: 'Good morning! welcome to BakeryChatbot our daily menu is: '+ await getMenu()
    }];   
}
initBot();

    io.on('connection',  function(socket){
        console.log('Someone is online with IP: '+socket.handshake.address);
    
        //emite mensaje, tiene que haber alguien que lo reciba
         socket.emit('messages', messages);
    
         socket.on('add-message',  function(data){
            messages.push(data);
    
              io.sockets.emit('messages', messages);
        });
    });
    


//Open socket
/* io.on('connection', async function(socket){
    console.log('Someone is online with IP: '+socket.handshake.address);

    //emite mensaje, tiene que haber alguien que lo reciba
    await socket.emit('messages', messages);

     socket.on('add-message', async function(data){
        messages.push(data);

         await io.sockets.emit('messages', messages);
    });
}); */

server.listen(8080, function(){
    console.log('Port is listening');
});
