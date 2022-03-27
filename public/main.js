let socket = io.connect('http://localhost:8080')
socket.on('connection', (data)=>{console.log(data)})