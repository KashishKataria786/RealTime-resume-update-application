import userModel from '../models/user.Models.js'

export const addCourseData = async(req,res)=>{try{
    const  {name,platform , certificateLink, description} =req.body;
    const {id} = req.user;
    if(!name || !platform || !certificateLink ||!description)return res.status(400).send({ok:false, status:false, message:"Missing Fields"});

    const userData = await userModel.findById(id);
    if(!userData)return res.status(404).send({ok:true, status:true, message:"User Data not found"});

    userData.courses.push({name, platform, certificateLink, description});
    await userData.save();

    return res.status(200).send({ok:true, status:true, message:"Courses Added Successfully", courses: userData.courses,})
}catch(error){
    console.log(error);
    res.status(500).send({ok:false, status:false, message:"Server Error-Internal Server Error"});
}};
export const addExperience = async(req,res)=>{
    try{
        const {id}=req.user
        const {title, company,typeOfEmployment,duration,description}= req.body
        if(!title || !company || !typeOfEmployment || !duration || !description)return res.status(400).send({ok:false, status:false,message:"Missing Fields"})
        
        const userData = await userModel.findById(id);
        if(!userData)return res.status(404).send({ok:true, status:true, message:"User Data not found"});

    userData.experiences.push({title, company,typeOfEmployment,duration,description});
    await userData.save();
     return res.status(200).send({ok:true, status:true, message:"Courses Added Successfully", experiences: userData.experiences})
    }catch(error){
        res.status(500).send({ok:false,status:false,messsage:"server Error- Internal Server error"})
    }
}
export const getResumeData = async(req,res)=>{
  try{
    const {id}=req.user;
    const resumeData = await userModel.findById(id);
    if(!resumeData)return res.status(404).send({ok:true, status:true, message:"Resume Data not found"})
    
    return res.status(200).send({ok:true,status:true, resumeData:resumeData});
  }catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}