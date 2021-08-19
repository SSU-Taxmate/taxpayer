const mongoose = require('mongoose')
/*
    Class
*/
const classSchema = mongoose.Schema({
    /*참가코드*/
    entrycode: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    teacherId: {/*owned*/
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },

})
const Class = mongoose.model('Class', classSchema)

/*
    JoinedUser(예전JoinClass)
    : Class와 Student를 연결하는 Schema
*/
const joineduserSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    userId:{//student
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    alias:{//동명이인 위해서
        type:String,
        default:''
    },
    /*클래스에 속한 student가 갖는 고유 정보 */
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        default:null
    },
    /*신용등급- creditRating*/
    /*account - JoinedUser._id로 Account에서 찾기*/

})
const JoinedUser=mongoose.model('JoinedUser',joineduserSchema);
module.exports = { Class ,JoinedUser}