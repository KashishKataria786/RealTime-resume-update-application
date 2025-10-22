import  { useState , useEffect} from 'react';
import SideModal from '../SideModal.jsx';
import Header from './Header.jsx';
import AddProjectForm from '../AddProjectForm.jsx'
import AddExperienceForm from  '../AddExperienceForm.jsx'
import AddCourseForm from '../AddCourseForm.jsx'
import AddSummaryForm from '../AddSummaryForm.jsx'
import AddSkillsForm from '../AddSkillsForm.jsx'
import {useResume} from '../../context/ResumeContext.jsx'

import NotLoggedIn from '../NotLoggedIn.jsx'

const MODAL_COMPONENTS = {
    'Summary': { name: 'Add Summary ', Component: AddSummaryForm },
    // 'Skills':{name:"Add Skills", Component:AddSkillsForm},
    'Experience': { name: 'Add Experience', Component: AddExperienceForm  },
    'Project': { name: 'Add Project', Component: AddProjectForm   },
    'Course': { name: 'Add Course', Component: AddCourseForm },
};


const Sidebar = ({ openModal }) => {
    const buttons = Object.keys(MODAL_COMPONENTS);

    return (
        <div className="w-64 p-4 border-r border-gray-200 bg-white h-full ">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Customize  Resume </h2>
            <div className="flex flex-col space-y-3">
                {buttons.map((key) => (
                    <button
                        key={key}
                        onClick={() => openModal(key)}
                        className="px-4 py-2 text-left text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                        {MODAL_COMPONENTS[key].name}
                    </button>
                ))}
            </div>
        </div>
    );
};


const DashboardLayout = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContentKey, setModalContentKey] = useState(null);
    const {refreshResumeData}= useResume();

  

    const openModal = (key) => {
        setModalContentKey(key);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        refreshResumeData();
        setIsModalOpen(false);
    };

    const ModalComponent = modalContentKey 
        ? MODAL_COMPONENTS[modalContentKey].Component 
        : null;

    const modalTitle = modalContentKey 
        ? MODAL_COMPONENTS[modalContentKey].name 
        : 'Add Data';

    return (
        <>
            <Header />
            
            {/* Main content wrapper */}
            <div className='flex '> {/* pt-16 ensures space below the fixed Header */}
                
                {/* 1. Fixed Sidebar Wrapper */}
                {/* sticky + top-16 fixes it just below the Header (Header is assumed to be h-16) */}
                <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
                    <Sidebar openModal={openModal} />
                </div>
                
                {/* 2. Main Content Area (takes up the rest of the space) */}
                <main className='flex-1 bg-gray-50 p-6'>
<div className="p-4 my-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-blue-700">
    ⚙️ Real-time External Website Integration
  </h2>
  <p className="text-gray-700 mt-1">
    Click below to stimulate the external website connection and view it in real time:
  </p>
  <a
    href={`${import.meta.env.VITE_EXTERNAL_WEBSITE}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-all"
  >
    🔗 Visit External Website
  </a>
</div>

                    {children}
                </main>
            </div>
            
            {/* SideModal logic remains the same */}
            <SideModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title={modalTitle}
            >
                {ModalComponent ? <ModalComponent onSuccess={closeModal} /> : <div>Select an option</div>}
            </SideModal>
        </>
    );
};

export default DashboardLayout;