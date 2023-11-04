const User = require('../Models/User');
const Doctor = require('../Models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async(req,res)=>{

    const {email, password, name, role, photo, gender} = req.body;
    try {
        let user = null;
        if(role === 'patient'){
            user = await User.findOne({email});
        }else{
            user = await User.findOne({email});
        }

        if(user){
            return res.status(400).json({message: 'User already exist'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if(role === 'patient'){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }
        if(role === 'doctor'){
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();

        res.status(200).json({success:true, message: 'User successfully created'});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error, try again later'});
    }
}

const login = async(req,res)=>{

    const {email,password} = req.body;

    try {
        let user = null;

        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});

        if(patient){
            user = patient;
        }
        if(doctor){
            user = doctor;
        }

        if(!user){
            return res.status(404).json({status:false,message: "Invalid Credentials"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(404).json({status:false,message: "Invalid Credentials"});
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SEC,{expiresIn: '1d'});

        //const {password, role, appointments,...rest} = user._doc;

        //res.status(200).json({success: true, message: "Successfully Login",token,data:{...rest},role});

        res.status(200).json({success: true, message: "Successfully Login",token});
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to login"});
    }
}

module.exports = {
    register,
    login
}