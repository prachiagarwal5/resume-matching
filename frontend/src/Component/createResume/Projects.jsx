import React from "react";
import { FaProjectDiagram, FaPlus, FaTrash } from "react-icons/fa";

const Projects = ({
  formData,
  handleProjectChange,
  addProjectInput,
  removeProject,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={FaProjectDiagram} title="Projects" />
        <button
          type="button"
          onClick={addProjectInput}
          className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {formData.projects.map((project, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClasses}>Project Title</label>
              <input
                type="text"
                className={inputClasses}
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                placeholder="Project Name"
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                className={`${inputClasses} min-h-[100px]`}
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                placeholder="Describe your project, technologies used, and outcomes"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="mt-2 text-red-500 hover:text-red-400 transition-colors duration-200"
          >
            <FaTrash /> Remove Project
          </button>
        </div>
      ))}
    </section>
  );
};

export default Projects;
