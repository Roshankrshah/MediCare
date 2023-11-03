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
            })
        }
        if(role === 'admin'){
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save();

        res.status(200).json({success:true, message: 'User successfully created'});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error, try again later'});
    }
}

module.exports = {
    register
}