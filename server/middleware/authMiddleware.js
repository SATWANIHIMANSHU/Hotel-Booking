import User from "../models/User.js";

// Middleware to authenticate user 

export const protect = async (req, res, next) => {
  try {
    const auth = req.auth();  
    if (!auth || !auth.userId) { 
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(auth.userId); 

    if (!user) {               
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;            
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};




// export const protect = async(req,res,next)=>{
//        const {userId} = req.auth;
//        if(!userId){
//         return res.status(401).json({message:"Unauthorized"});
//        }else{
//         const user = await User.findById(userId);
//         req.user = user;
//         next();
//        }
// }