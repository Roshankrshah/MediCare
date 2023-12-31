const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone:{
        type: Number
    },
    photo:{
        type: String
    },
    gender:{
        type: String,
        enum: ["male","female","other"]
    },
    ticketPrice: {
        type: Number
    },
    role:{
        type: String,
        enum: ["patient","doctor"],
        default: "patient"
    },
    specialization:{
        type: String
    },
    qualifications:{
        type: Array
    },
    experiences:{
        type: Array
    },
    bio:{
        type: String,
        maxLength: 50,
    },
    about:{
        type: String
    },
    timeSlots:[{
        day :{
            type: String,
        },
        start:{
            type: String
        },
        end:{
            type: String
        }
    }],
    reviews:[{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }],
    averageRating: {
        type: Number,
        default: 0,
    },
    totalRating: {
        type: Number,
        default: 0
    },
    isApproved:{
        type: String,
        enum: ["pending","approved","cancelled"],
        default: "pending"
    },
    appointments:[{
        type: mongoose.Types.ObjectId,
        ref: 'Booking'
    }]
});

module.exports = mongoose.model('Doctor',DoctorSchema);