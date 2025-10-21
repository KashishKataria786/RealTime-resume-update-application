import { useState } from 'react';
import axios from 'axios'
import {toast }from 'react-toastify'
const AddCourseForm = ({onSuccess}) => {

const [formData, setFormData] = useState({
    email: "",
    name: "",
    description: "",
    certificateLink: "",
    platform: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const token= localStorage.getItem('token') 

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/resume/add-course`,formData, {headers:{
        Authorization:`${token}`,
      }} )
      setResult(res.data);

      if (res.data.ok === true) {
        toast.success("Course Added Successfully");
        onSuccess&& onSuccess();
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
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <h2 className="text-2xl font-semibold text-blue-500">Add Course</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Course Name*</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-1">Platform (e.g., Coursera, Udemy)</label>
                <input
                    type="text"
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="certificateLink" className="block text-sm font-semibold text-gray-700 mb-1">Certificate Link (URL)</label>
                <input
                    type="url"
                    id="certificateLink"
                    name="certificateLink"
                    value={formData.certificateLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description/Key Learnings</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                Add Course
            </button>
        </form>
    );
};

export default AddCourseForm;