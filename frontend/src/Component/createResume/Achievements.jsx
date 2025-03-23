import React from "react";
import { FaTrophy, FaPlus, FaTrash } from "react-icons/fa";

const Achievements = ({
  formData,
  handleAchieveChange,
  addAchieveInput,
  removeAchievement,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={FaTrophy} title="Achievements" />
        <button
          type="button"
          onClick={addAchieveInput}
          className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {formData.achievements.map((achievement, index) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            type="text"
            className={inputClasses}
            value={achievement}
            onChange={(e) => handleAchieveChange(index, null, e.target.value)}
            placeholder="Describe your achievement"
          />
          <button
            type="button"
            onClick={() => removeAchievement(index)}
            className="text-red-500 hover:text-red-400 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </section>
  );
};

export default Achievements;
