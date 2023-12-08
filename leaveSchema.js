const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id : {
        type : mongoose.ObjectId,
        require : true
    },
    id : {
        type : Number,
        require : true
    },
    Name : {
        type : String
    },
    type : {
        type: String
    },
    fromDate : {
        type: Date
    },
    toDate : {
        type : Date
    },
    emailId : {
        type : String
    },
    phone : {
        type : Number
    },
    department : {
        type: String
    }
})

module.exports = mongoose.model('leave',schema);