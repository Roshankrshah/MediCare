const User = require('../Models/User');
const Doctor = require('../Models/Doctor');
const Booking = require('../Models/Booking');

const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (updatedUser)
            res.status(200).json({ success: true, message: "Successfully Updated", data: updatedUser });
        else
            return res.status(404).json({ success: false, message: "User Not Found" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Updated" });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Delete" });
    }
}

const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');
        if (user)
            res.status(200).json({ success: true, message: "User found", data: user });
        else
            return res.status(404).json({ success: false, message: "User Not Found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            message: "Users Found",
            data: users
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Not found" });
    }
}

const getUserProfile = async(req,res)=>{
    const userId = req.userId;
    try {
        const user = await User.findById(userId);

        if(!user)
           return res.status(404).json({success: false,message:'User not found'});
        
        const {password, ...rest} =user._doc;

        res.status(200).json({success: true, message:'Profile info is getting',data:{...rest}});
    } catch (error) {
        res.status(500).json({success:false,message:'Something went wrong, cannot get'});
    }
};

const getMyAppointments = async(req,res)=>{
    try {
        const bookings = await Booking.find({user: req.userId});

        const doctorIds = bookings.map(el => el.doctor.id);

        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select('-password');

        res.status(200).json({success: true,message: 'Appointments are getting', data: doctors});
    } catch (error) {
        res.status(500).json({success: false,message: 'Something went wrong,try again'});
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser,
    getUserProfile,
    getMyAppointments,
}