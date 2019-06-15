import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import redisClient from './redis-client'

dotenv.load()
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

http.listen(process.env.PORT)

app.get('/', (_, res) => {
	res.send('Diego Cao: Hello')
  })

  io.on('connection', (socket) => {
	console.log('a user connected')
	socket.on('disconnect', () => {
		console.log('user disconnected')
	  })
  })

redisClient.rsmq.createQueue({qname:"myqueue"}, function (_err, resp) {
  if (resp===1) {
    console.log("queue created")
  }
})

redisClient.rsmq.sendMessage({qname:"myqueue", message:"Hello World"}, function (_err, resp) {
	if (resp) {
		console.log("Message sent. ID:", resp);
	}
})

redisClient.rsmq.listQueues( function (err, queues) {
	if( err ){
		console.error( err )
		return
	}
	console.log("Active queues: " + queues.join( "," ) )
})

redisClient.rsmq.receiveMessage({qname:"myqueue"}, function (_err, resp) {
	if (resp !== null && resp !== undefined && resp.id) {
		console.log("Message received.", resp)	
	}
	else {
		console.log("No messages for me...")
	}
})