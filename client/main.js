var socket = io.connect('http://192.168.0.14:8080',{'forceNew': true});

//suscriptor recibe mensaje
socket.on('messages', function(data){
    console.log(data);
  render(data)

});

//pasa los datos al html. Recorre los mensajes y va iterando
 function render(data){
    var html = data.map(function(message, index){
        return (`
        <div class="message">
    <strong>${message.nickname}<strong> <p>${message.text}</p></div>
    `);
    
    }).join('');
    document.getElementById('messages').innerHTML= html
}
function addMessage(){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}