    import { generateSignature } from "../utils/utils.js";
    import axios from 'axios';
    export const courseraStimulation=async(req,res)=>{
        try{
            const {email, name, description, certificateLink, platform}= req.body;
            if(!email ||  !name || !description || !certificateLink||  !platform)return res.status(400).send({ok:false, status:false, message:"Missing Fields"});
            const payload = {email:email, name:name, description:description, certificateLink:certificateLink , platform:platform};
            const signature = generateSignature(payload);

            const response = await axios.post(process.env.TARGET_URL, payload,{headers:{
                "x-webhook-signature":signature,
                "content-type":"application/json"
            }});

            res.status(200).send({
                ok:true,
                status:true,
                message:"Coursera webohook sent",
                backendResponse :payload
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({message:"Server-Error: Internal Server Error"})
        }
    }