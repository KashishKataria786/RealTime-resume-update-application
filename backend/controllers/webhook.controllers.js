
import userModel from "../models/user.Models.js";

export const webhookController = async (req, res) => {
  try {
    const { email, name, description, certificateLink, platform } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).send({
        ok: false,
        status: false,
        message: "User not Found",
      });

    user.courses.push({ name, description, certificateLink, platform });
    await user.save();

    // Get socket references
    const userSocketMap = req.app.get("userSocketMap");
    const io = req.app.get("io");

    const socketId = userSocketMap.get(email);

    const payloadToEmit = {
      email,
      platform,
      updatedCourses: user.courses,
      message: "Course added successfully!",
    };

    if (socketId && io.sockets.sockets.get(socketId)) {
      io.to(socketId).emit("Resume Updated", payloadToEmit);
      console.log(`✅ Emitted update to ${email}`);
    } else {
      console.log(`⚠️ ${email} not connected to socket`);
    }

    console.log("Webhook verified");
    return res
      .status(200)
      .send({ ok: true, status: true, message: "Data added", user });
  } catch (error) {
    console.error("Webhook error:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
