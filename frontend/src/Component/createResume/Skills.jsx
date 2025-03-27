import React from "react";
import { FaCode, FaPlus, FaTrash } from "react-icons/fa";

const Skills = ({
  formData,
  handleSkillChange,
  addSkillInput,
  removeSkill,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <SectionTitle icon={FaCode} title="Skills" />

      {/* Technical Skills */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-purple-400">
            Technical Skills
          </h3>
          <button
            type="button"
            onClick={() => addSkillInput("technicalSkills")}
            className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
        <div className="space-y-3">
          {formData.technicalSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className={`${inputClasses} flex-grow`}
                value={skill}
                onChange={(e) =>
                  handleSkillChange(index, "technicalSkills", e.target.value)
                }
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <button
                type="button"
                onClick={() => removeSkill(index, "technicalSkills")}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-purple-400">Soft Skills</h3>
          <button
            type="button"
            onClick={() => addSkillInput("softSkills")}
            className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
        <div className="space-y-3">
          {formData.softSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className={`${inputClasses} flex-grow`}
                value={skill}
                onChange={(e) =>
                  handleSkillChange(index, "softSkills", e.target.value)
                }
                placeholder="e.g., Leadership, Communication, Team Work"
              />
              <button
                type="button"
                onClick={() => removeSkill(index, "softSkills")}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;