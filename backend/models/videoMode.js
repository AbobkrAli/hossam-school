import mongoose from "mongoose";

const videoModel = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    content:{
        type: String,
    },
    // grade:{
    //     type: String,
    //     required: true
    // }
})

const Video = mongoose.model('video', videoModel)
export default  Video
