const mongoose = require ("mongoose")

const bookschema = mongoose.Schema({

  title:{
     type:String,
     require:true
  },
  author:{
    type:String,
    require:true
 },
 publishYear:{
    type:Number,
    require:true
 },
},{
    timestamps:true
})

module.exports = mongoose.model("Books",bookschema)