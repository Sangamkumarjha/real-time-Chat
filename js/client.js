const socket = io("http://localhost:8080",{
    transports:['websocket','polling','flashsocket'],
});
//get dom element
const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
//message ring
var audio =new Audio('ring.mp3');
//append function event info
const append = (message, possition) => {
  const messsageElement = document.createElement('div');
  messsageElement.innerText = message;
  messsageElement.classList.add('message');
  messsageElement.classList.add(possition);
  messageContainer.append(messsageElement);
  if(possition=='left'){
    audio.play();
  }
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You:${message}`,'right')
    socket.emit('send',message)
    messageInp.value = '';
})
//Ask new user name
const name = prompt("Enter Your Name To Join: ");
socket.emit('new-user-joined', name);
//if a new user join receive the event from the server 
socket.on("user-joined", (name) => {
  append(`${name} joined the chart`, "right");
});
//if a send the message recevied to the server
socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

//if the user left the chat
socket.on('left', name=>{
  append(`${name} : left the chat`,'right')
})
