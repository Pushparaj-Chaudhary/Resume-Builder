import React from 'react';

const ATSTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  const hrStyle = {
    border: '0',
    borderTop: '1px solid #333',
    margin: '10px 0'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#000',
    borderBottom: '1px solid #000'
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-serif leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 uppercase">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.personal_info?.profession && (
          <h2 className="text-xl mb-2 focus:outline-none">{data.personal_info.profession}</h2>
        )}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.phone && <span> | {data.personal_info.phone}</span>}
          {data.personal_info?.email && <span> | {data.personal_info.email}</span>}
          {data.personal_info?.linkedin && <span> | LinkedIn: {data.personal_info.linkedin}</span>}
          {data.personal_info?.website && <span> | Portfolio: {data.personal_info.website}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-4">
          <h2 style={sectionTitleStyle}>Professional Summary</h2>
          <p className="text-sm">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 style={sectionTitleStyle}>Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold uppercase">{exp.company}</span>
                  <span className="text-sm">
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic mb-1">
                  <span className="font-semibold text-sm">{exp.position}</span>
                </div>
                {exp.description && (
                  <div className="text-sm whitespace-pre-line pl-2 border-l border-gray-100">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-4">
          <h2 style={sectionTitleStyle}>Key Projects</h2>
          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index}>
                <div className="font-bold text-sm uppercase">
                  {proj.name} {proj.type && <span className="font-normal italic">| {proj.type}</span>}
                </div>
                {proj.description && (
                  <p className="text-sm mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 style={sectionTitleStyle}>Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold uppercase text-sm">{edu.institution}</span>
                  <span className="text-sm">{formatDate(edu.graduation_date)}</span>
                </div>
                <div className="flex justify-between items-baseline italic">
                  <span className="text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  {edu.gpa && <span className="text-sm">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
            <h2 style={sectionTitleStyle}>Technical Skills</h2>
            <p className="text-sm">
                {data.skills.join(', ')}
            </p>
        </section>
      )}
    </div>
  );
};

export default ATSTemplate;
