import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'

dotenv.load()
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(urlencoded({ extended: true, limit: '500mb' }))
app.use(json({ extended: true, limit: '500mb' }))
app.use(cors())

http.listen(process.env.PORT)

app.get('/', (_, res) => {
	res.send('Diego Cao: Socket IO')
})

io.on('connection', (socket) => {
	var uid = ""
	console.log('user connected')
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on("user_join", (data) => {
		uid = data
		console.log('uid: ' + uid)
		socket.broadcast.emit("user_join", data)
	})

	socket.on("chat_message", (data) => {
		data.uid = uid
		console.log('data: ')
		console.log(data)
		socket.emit("chat_message", data)
	})

})
