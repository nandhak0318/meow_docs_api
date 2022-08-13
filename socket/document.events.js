const {
  loadOrSetDoc,
  updateDoc
} = require('../controllers/document.controller')


module.exports = (socket, next) => {
  try {
    socket.on('get-document', async documentID => {
      const document = await loadOrSetDoc(documentID)
      socket.join(documentID)
      socket.emit('load-document', document.data)
    })
    socket.on('text-change', (delta) => {
      socket.broadcast.emit('recieve-change', delta)
    })
    socket.on('save-changes', async ({
      id,
      data
    }) => {
      await updateDoc(id, data)
    })
    next()

  } catch (e) {
    console.log(e)
    next()
  }
}