import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSkillsForm = ({ onClose , onSuccess }) => {
    
    const [skillsString, setSkillsString] = useState('');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setSkillsString(e.target.value);
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

        const skillsArray = skillsString
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        if (skillsArray.length === 0) {
            toast.warn("Please enter at least one skill.");
            setLoading(false);
            return;
        }

        const submissionData = {
            skills: skillsArray
        };

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/resume/add-skills`,
                submissionData,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            
            setResult(res.data);

            if (res.data.ok === true) {
                toast.success("Skills updated successfully");
                onSuccess && onSuccess()
            } else {
                toast.warn("⚠️ Operation successful, but unexpected server response.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update skills or server error!");
            setResult({ error: err.response?.data || "Server error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold text-blue-500">Add Skills </h2>
            <div>
                <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-1">Core Skills (Comma Separated)</label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={skillsString}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, TypeScript, AWS"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Adding Skills...' : 'Add Skills'}
            </button>
            {result && result.error && (
                <p className="text-red-500 text-sm mt-2">Error: {result.error.message || result.error}</p>
            )}
        </form>
    );
};

export default AddSkillsForm;