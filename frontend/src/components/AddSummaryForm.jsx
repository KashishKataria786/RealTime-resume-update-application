import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSummaryForm = ({ initialSummary = '', onClose , onSuccess }) => {
    
    // State only for the professional summary
    const [summary, setSummary] = useState(initialSummary); 
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

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

        const submissionData = {
            summary: summary,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/resume/add-summary`, 
                submissionData,
                {
                    headers: {
                        Authorization:`${token}`,
                    },
                }
            );
            
            setResult(res.data);

            if (res.data.ok === true) {
                toast.success("Professional Summary updated successfully");
                onSuccess && onSuccess()
            } else {
                toast.warn("⚠️ Operation successful, but unexpected server response.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update summary or server error!");
            setResult({ error: err.response?.data || "Server error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold text-blue-500">Add Summary</h2>
            <div>
                <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-1">Professional Summary</label>
                <textarea
                    id="summary"
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows="6"
                    placeholder="Results-driven developer with 5+ years experience..."
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">This is usually the first paragraph on your resume.</p>
            </div>
            
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Adding Summary...' : 'Adding Summary'}
            </button>
            {result && result.error && (
                <p className="text-red-500 text-sm mt-2">Error: {result.error.message || result.error}</p>
            )}
        </form>
    );
};

export default AddSummaryForm;