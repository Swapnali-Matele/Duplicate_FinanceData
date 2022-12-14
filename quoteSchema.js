const mongoose= require('mongoose');
//import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    fullExchangeName:{
        type: String,
        
    },
    quoteType:{
        type: String,
        
    },
    market:{
        type: String,
    },
 
    region:{
        type: String,
    },
    currency:{
        type: String,
    },
    longName:{
        type: String,
    }
})

module.exports = mongoose.model('Quotes', quoteSchema)
//export default mongoose.model('Quotes', quoteSchema);