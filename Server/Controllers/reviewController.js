const Review = require('../Models/Review');
const Doctor = require('../Models/Doctor');

const getAllReviews = async(req,res)=>{
    try {
        const reviews = await Review.find({});

        if(!reviews)
            return res.status(404).json({success: false, message:'Not Found'});

        res.status(200).json({success: true, message:'Successful',data:reviews});
    } catch (error) {
        res.status(500).json({success: false, message:'Internal Server error'});
    }
}

const createReview = async(req,res)=>{
    if(!req.body.doctor) 
        req.body.doctor = req.params.doctorId;

    if(!req.body.user) 
        req.body.user = req.userId;
    
    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save();

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success:true,message:'Review Submitted Successfully'});
    } catch (error) {
        res.status(500).json({success:false,message:err.message});   
    }
}

module.exports = {
    getAllReviews,
    createReview
}