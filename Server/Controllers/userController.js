const User = require('../Models/User');

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
        await User.findByIdAndDelete(id, { $set: req.body }, { new: true });
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

module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser
}