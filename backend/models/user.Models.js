import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
  },
  password:{
    type:String,
    required:true,
  },
  skills: {
    type: [String],
    default: [],
  },
  experiences: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      typeOfEmployment: {
        type: String,
        enum: ["internship", "fullTime", "partTime"],
        required: true,
      },
      duration: { type: String },
      description: { type: String },
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String },
      techStack: { type: [String], default: [] },
      livePreviewLink: { type: String },
    },
  ],
  courses: [
    {
      name: { type: String, required: true },
      platform: { type: String },
      certificateLink: { type: String },
      description: { type: String },
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
