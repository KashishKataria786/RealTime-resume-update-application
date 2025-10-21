import Layout from '../components/Layout/Layout.jsx'
import { PiReadCvLogoFill } from "react-icons/pi";
const HomePage = () => {
  return (
    // Use a soft gray background with blue accents
    <Layout className="min-h-screen z-30 bg-gray-50 text-gray-900 flex flex-col"> 
      
      {/* 1. Hero Section (Clean and Elegant) */}
      <section className="flex flex-col items-center justify-center text-center py-32 md:py-48 px-6 bg-white  overflow-hidden relative">
        {/* Soft Blue background element for aesthetic touch */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <PiReadCvLogoFill size={40} className="my-5" color="blue"/>
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-5 py-2 rounded-full mb-6 border border-blue-200 uppercase tracking-widest">
            The Centralized Career Platform
        </span>
        <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 leading-tight mb-6 max-w-5xl">
          <span className="font-light text-gray-700 block mb-4">Master Your</span> 
          <span className="text-blue-600">Dynamic Resume</span> Data
        </h1>
        <p className="text-gray-500 max-w-3xl text-2xl mb-12 font-light">
          Automatically synchronize every professional update—from certifications to new roles—across all your linked platforms.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-2xl shadow-blue-300 transform hover:scale-[1.03] transition duration-300 tracking-wider">
            Start Free Sync 🚀
          </button>
          <button className="px-12 py-4 border-2 border-gray-300 hover:border-blue-400 text-gray-700 font-light text-lg rounded-full transition duration-300 bg-white">
            View Platform Integrations
          </button>
        </div>
      </section>

    

    </Layout>
  );
};

export default HomePage