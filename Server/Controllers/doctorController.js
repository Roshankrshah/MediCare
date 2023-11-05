const Doctor = require('../Models/Doctor');

const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (updatedDoctor)
            res.status(200).json({ success: true, message: "Successfully Updated", data: updatedDoctor });
        else
            return res.status(404).json({ success: false, message: "Doctor Not Found" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Updated" });
    }
}

const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Successfully Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Delete" });
    }
}

const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id).populate('review').select('-password');
        if (doctor)
            res.status(200).json({ success: true, message: "Doctor found", data: doctor });
        else
            return res.status(404).json({ success: false, message: "Doctor Not Found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAllDoctor = async (req, res) => {
    try {

        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select('-password')
        } else {
            doctors = await Doctor.find({isApproved: "approved"}).select('-password');
        }
        res.status(200).json({
            success: true,
            message: "Doctors Found",
            data: doctors
        });

    } catch (error) {
        res.status(404).json({ success: false, message: "Not found" });
    }
}

module.exports = {
    updateDoctor,
    deleteDoctor,
    getSingleDoctor,
    getAllDoctor
}