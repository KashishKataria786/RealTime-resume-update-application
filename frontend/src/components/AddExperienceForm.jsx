import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const employmentTypes = ["Internship", "FullTime", "PartTime"];

const AddExperienceForm = ({ onClose , onSuccess }) => {

    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        typeOfEmployment: 'FullTime',
        duration: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Authentication required.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/resume/add-experience`, 
                experienceData,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            setResult(res.data);

            if (res.data.ok === true) {
                toast.success("Experience Added Successfully");
                onSuccess && onSuccess()
            } else {
                toast.warn("⚠️ Operation successful, but unexpected server response.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add experience or server error!");
            setResult({ error: err.response?.data || "Server error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold text-blue-500">Add Experience</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Job Title*</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={experienceData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">Company/Organization*</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={experienceData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="typeOfEmployment" className="block text-sm font-semibold text-gray-700 mb-1">Employment Type*</label>
                    <select
                        id="typeOfEmployment"
                        name="typeOfEmployment"
                        value={experienceData.typeOfEmployment}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {employmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1">Duration (e.g., Jan 2022 - Present)</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={experienceData.duration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Key Responsibilities/Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={experienceData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Experience'}
            </button>
            {result && result.error && (
                <p className="text-red-500 text-sm mt-2">Error: {result.error.message || result.error}</p>
            )}
        </form>
    );
};

export default AddExperienceForm;