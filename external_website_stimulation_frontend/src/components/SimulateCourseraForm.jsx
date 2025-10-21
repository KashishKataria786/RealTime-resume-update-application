import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function SimulateCourseraForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    description: "",
    certificateLink: "",
    platform: "Coursera",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/stimulate/coursera`, form);
      setResult(res.data);

      if (res.data.ok === true) {
        toast.success("✅ Webhook Sent Successfully!");
      } else {
        toast.warn("⚠️ Webhook sent but response not OK!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send webhook!");
      setResult({ error: err.response?.data || "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl w-[90%] max-w-lg border border-gray-700"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">
           Simulate Coursera Course Completion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className='text-left'>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Course Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full-Stack Web Development"
              required
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your achievement..."
              rows="3"
              required
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Certificate Link</label>
            <input
              type="url"
              name="certificateLink"
              value={form.certificateLink}
              onChange={handleChange}
              placeholder="https://coursera.org/certificate/XYZ"
              required
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "🚀 Send Webhook"}
          </motion.button>
        </form>

        {result && (
          <motion.pre
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-4 mt-6 rounded-lg border border-gray-700 text-sm overflow-x-auto text-green-400"
          >
            {JSON.stringify(result, null, 2)}
          </motion.pre>
        )}
      </motion.div>

      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </div>
  );
}
