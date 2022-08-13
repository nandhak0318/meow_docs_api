require('dotenv').config()
const app = require('express')()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const text_events = require('./socket/document.events')

const io = require('socket.io')(server,{
  cors:{
    origin: '*'
  }
})

io.on('connection',(socket)=>{
  console.log('a user connected')
  socket.on('disconnect',()=>{
    console.log('user disconnected')
  } )
}).use(text_events)


app.get('/',(req,res)=>{
  res.status(200).send('this is backend of meow docs')
})

const PORT = process.env.PORT || 80
const start = async ()=>{
 await  mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
  server.listen(PORT, () => {
    console.log(`lisenning on port ${PORT}`)
  })
}

start()
