
export const admin = (req,res,next)=>{

    if (req.user.userRole !=="Admin"){
return res.status(403).json({message:"Access denied you are not Authorized, contact Admin please!"});

    }
    req.user
    next();
};