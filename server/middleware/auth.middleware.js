const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const Secret_Key = "JCKKVJO7865";

const authMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).json({message: "invalid token !", success: false});
        }

        const token = authHeader.split(" ")[1];

        const verifiedToken = jwt.verify(token , Secret_Key);

        if(!verifiedToken){
         return res.status(401).json({message: "invalid token !", success: false});
        }

            const verifiedUser = await User.findOne({Email: verifiedToken?.email}).select("-Password");

        if(!verifiedUser){
         return res.status(401).json({message: "Not a valid user!", success: false});

        }
        
        req.user = verifiedUser;
        next();

        

    } catch (err) {

        if(err.name === "TokenExpiredError"){
         return res.status(401).json({message: "token expired !", success: false});

        }

        if(err.name === "jsonWebTokenError"){
         return res.status(403).json({message: "invalid token authentication failed!", success: false});

        }

        return res
        .status(403).json({message: err.message, success: false});

    }
}

module.exports = authMiddleWare;