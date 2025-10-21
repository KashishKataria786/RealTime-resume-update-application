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

export const addProject = async (req, res) => {

    const userId = req.user.id; 
    
    const { title, description, techStack, livePreviewLink } = req.body;

 
    if (!title) {
        return res.status(400).json({ success: false, message: 'Project title is required.' });
    }

    try {
      
        const newProject = {
            title,
            description,
            techStack, 
            livePreviewLink,
        };
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    projects: newProject,
                },
            },
            { 
                new: true,          
                runValidators: true 
            }
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(201).json({
            ok: true,
            success: true,
            message: 'Project added successfully.',
            project: newProject,
            projectsCount: updatedUser.projects.length,
        });

    } catch (error) {
        console.error('Error adding project:', error);
        

        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }

        return res.status(500).json({ success: false, message: 'Failed to add project due to a server error.' });
    }
};



export const addSummary = async (req, res) => {
    
    const userId = req.user.id; 
    const { summary } = req.body;

    if (summary === undefined) {
        return res.status(400).json({ success: false, message: 'Professional summary field is required.' });
    }

    try {
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { summary: summary } },
            { 
                new: true,          
                runValidators: true 
            }
        ).select('summary -_id'); 

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({
            ok: true,
            success: true,
            message: 'Professional summary updated successfully.',
            professionalSummary: updatedUser.summary,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: 'Failed to update summary due to a server error.' });
    }
};

export const addSkills = async (req, res) => {
    
    const userId = req.user.id; 
    const { skills } = req.body;

    if (skills === undefined) {
        return res.status(400).json({ success: false, message: 'Skills array is required.' });
    }
    
    if (!Array.isArray(skills)) {
        return res.status(400).json({ success: false, message: 'Skills must be provided as an array of strings.' });
    }

    try {
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { skills: skills } },
            { 
                new: true,          
                runValidators: true 
            }
        ).select('skills -_id'); 

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({
            ok: true,
            success: true,
            message: 'Skills updated successfully.',
            skills: updatedUser.skills,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: 'Failed to update skills due to a server error.' });
    }
};