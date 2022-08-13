const DocModel = require('../models/document.model')

const loadOrSetDoc = async (docID)=>{
  if (docID==null) return 
  let doc = await DocModel.findById(docID)
  if (doc) return doc
  else return DocModel.create({_id:docID})
}

const updateDoc = async (docID,data)=>{
  if (docID==null) return 
  let doc = await DocModel.findByIdAndUpdate(docID,{data})
  return 
}

module.exports = {
  loadOrSetDoc
,
updateDoc
}
