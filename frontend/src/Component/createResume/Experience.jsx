import React from "react";
import { FaBriefcase, FaPlus, FaTrash } from "react-icons/fa";

const Experience = ({
  formData,
  handleExperienceChange,
  addExperienceInput,
  removeExperience,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={FaBriefcase} title="Work Experience" />
        <button
          type="button"
          onClick={addExperienceInput}
          className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Designation</label>
              <input
                type="text"
                className={inputClasses}
                value={exp.designation}
                onChange={(e) =>
                  handleExperienceChange(index, "designation", e.target.value)
                }
                placeholder="Job Title"
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Company Name</label>
              <input
                type="text"
                className={inputClasses}
                value={exp.companyName}
                onChange={(e) =>
                  handleExperienceChange(index, "companyName", e.target.value)
                }
                placeholder="Company Name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Description</label>
              <textarea
                className={`${inputClasses} min-h-[100px]`}
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                placeholder="Describe your role, responsibilities, and achievements"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="mt-2 text-red-500 hover:text-red-400 transition-colors duration-200"
          >
            <FaTrash /> Remove Experience
          </button>
        </div>
      ))}
    </section>
  );
};

export default Experience;
