import React from 'react';

const ResumeTemplate = ({ user }) => {
  const {
    name,
    email,
    summary,
    skills = [],
    experiences = [],
    projects = [],
    courses = [],
  } = user;

  const SectionTitle = ({ children }) => (
    <h2 className="text-xl font-bold text-gray-700 border-b-2 border-blue-400 pb-1 mb-4 uppercase tracking-wider">
      {children}
    </h2>
  );
  
  const NoDataPlaceholder = ({ type }) => (
      <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm italic">
          No {type} added yet. Use the sidebar to add your professional data!
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg py-12 px-10 text-gray-800">

        <div className=" border-gray-300 pb-5 mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
          <p className="text-md text-blue-600 font-semibold mt-1">{email}</p>
        </div>

        {/* Professional Summary */}
        <section className="mb-8">
            <SectionTitle>Summary</SectionTitle>
            {summary ? (
                <p className="text-gray-700 text-base leading-relaxed font-light">
                    {summary}
                </p>
            ) : (
                <div className="text-center py-6 bg-yellow-50 border border-dashed border-yellow-300 rounded-lg text-yellow-700 text-base font-medium">
                    Please provide a **Professional Summary** to introduce yourself!
                </div>
            )}
        </section>

        {/* Skills */}
        <section className="mb-8">
            <SectionTitle>Skills</SectionTitle>
            {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full border border-blue-200 shadow-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <NoDataPlaceholder type="Skills" />
            )}
        </section>

        {/* Experience */}
        <section className="mb-8">
            <SectionTitle>Experience</SectionTitle>
            {experiences.length > 0 ? (
                <div className="space-y-6">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative pl-5 border-l border-gray-300">
                            <span className="absolute left-[-5px] top-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                {exp.title}
                            </h3>
                            <p className="text-md text-gray-600 font-semibold italic">
                                {exp.company}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                {exp.typeOfEmployment} | {exp.duration}
                            </p>
                            <p className="text-sm text-gray-700 font-light leading-snug">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataPlaceholder type="Experience" />
            )}
        </section>

        {/* Projects */}
        <section className="mb-8">
            <SectionTitle>Projects</SectionTitle>
            {projects.length > 0 ? (
                <div className="space-y-6">
                    {projects.map((proj, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                {proj.title}
                            </h3>
                            <p className="text-sm text-gray-700 mb-1 font-light leading-snug">
                                {proj.description}
                            </p>
                            {proj.techStack && proj.techStack.length > 0 && (
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    Tech Stack: <span className="text-gray-700">{proj.techStack.join(" / ")}</span>
                                </p>
                            )}
                            {proj.livePreviewLink && (
                                <a
                                    href={proj.livePreviewLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition block mt-1"
                                >
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataPlaceholder type="Projects" />
            )}
        </section>

        {/* Courses */}
        <section>
            <SectionTitle>Courses & Certifications</SectionTitle>
            {courses.length > 0 ? (
                <div className="space-y-4">
                    {courses.map((course, i) => (
                        <div key={i}>
                            <h3 className="font-semibold text-gray-800 text-md leading-snug">
                                {course.name}{" "}
                                {course.platform && (
                                    <span className="text-gray-500 text-sm font-normal">
                                        ({course.platform})
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-700 font-light">
                                {course.description}
                            </p>
                            {course.certificateLink && (
                                <a
                                    href={course.certificateLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 text-xs hover:underline mt-1 block"
                                >
                                    View Certificate →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataPlaceholder type="Courses" />
            )}
        </section>
      </div>
    </div>
  );
};

export default ResumeTemplate;