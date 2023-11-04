const jwt = require('jsonwebtoken');
const Doctor = require('../../Models/Doctor');
const User = require('../../Models/User');

const authenticate = async(req,res,next)=>{
    const authToken = req.headers.authorization;
    
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({'success': false, message:'No token, authorization denied'});
    }

    try {
        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SEC);
        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token is Expired"});
        }
        return res.status(401).json({success: false, message: 'Invalid token'})
    }  
}

const restrict = roles=> async(req,res,next)=>{
    const userId = req.userId;

    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if(patient){
        user = patient;
    }
    if(doctor){
        user = doctor
    }
    console.log(roles);
    if(!roles.includes(user.role)){
        return res.status(401).json({success:false, message: "You're not authorized"});
    }
    next();
}

module.exports = {
    authenticate,
    restrict
}