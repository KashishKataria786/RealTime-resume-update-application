import userModel from "../models/user.Models.js";
export const webhookController = async(req,res)=>{
    try{
        const {payload} = req.user
        const {email, name, description,certificateLink,platform} = payload;
        const user = await userModel.findOne({email:email});
        if(!user)return res.status(404).send({ok:false,status:false,message:"User not Found"});

        user?.courses.push({email, name, description,certificateLink,platform })

        await user.save();

        console.log(payload);
        console.log("Hook verified");
        return res.status(200).send({ok:true,status:true, message:"Added Data", user:user});
    }catch(error){
        return res.status(500).send({message:"Internal Server Error"});
    }
}