import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProjectForm = ({ onClose ,onSuccess }) => {
    
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        techStack: '', // Will be split by comma
        livePreviewLink: '',
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Authentication required. Please log in.");
            setLoading(false);
            return;
        }

        // Prepare the data structure expected by the backend
        const submissionData = {
            ...projectData,
            // Convert comma-separated string to array, filter out empty strings
            techStack: projectData.techStack.split(',').map(s => s.trim()).filter(s => s.length > 0)
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/resume/add-project`, // Assuming this is your API endpoint
                submissionData,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            
            setResult(res.data);

            if (res.data.ok === true) {
                toast.success("Project Added Successfully");
                onSuccess && onSuccess();
                setProjectData({
                    title: '',
                    description: '',
                    techStack: '',
                    livePreviewLink: '',
                }); 
                // onClose && onClose(); 
            } else {
                toast.warn("⚠️ Operation successful, but unexpected server response.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add project or server error!");
            setResult({ error: err.response?.data || "Server error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold text-blue-500">Add Project</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Project Title*</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={projectData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={projectData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="techStack" className="block text-sm font-semibold text-gray-700 mb-1">Tech Stack (Comma Separated)</label>
                <input
                    type="text"
                    id="techStack"
                    name="techStack"
                    value={projectData.techStack}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="livePreviewLink" className="block text-sm font-semibold text-gray-700 mb-1">Live Preview Link</label>
                <input
                    type="url"
                    id="livePreviewLink"
                    name="livePreviewLink"
                    value={projectData.livePreviewLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Project'}
            </button>
            {result && result.error && (
                <p className="text-red-500 text-sm mt-2">Error: {result.error.message || result.error}</p>
            )}
        </form>
    );
};

export default AddProjectForm;